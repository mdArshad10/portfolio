import { chromium } from "playwright"
import AxeBuilder from "@axe-core/playwright"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

const baseUrl = process.env.AUDIT_URL || "http://127.0.0.1:5173"
const label = process.argv[2] || "before"
const root = path.resolve("artifacts/ux-audit", label)
await mkdir(root, { recursive: true })

const browser = await chromium.launch({ headless: true })
const manifest = []
const screenshots = []
const consoleEntries = []
const networkEntries = []
const accessibility = []
const layouts = []

const stamp = () => new Date().toISOString()
const pause = (ms = 650) => new Promise((resolve) => setTimeout(resolve, ms))
const record = async (type, route, action, selector, result, screenshot) => {
  manifest.push({ at: stamp(), type, route, action, selector, result, screenshot })
  await pause()
}

const attachObservers = (page, surface) => {
  page.on("console", (message) => {
    consoleEntries.push({
      at: stamp(),
      surface,
      type: message.type(),
      text: message.text(),
    })
  })
  page.on("pageerror", (error) => {
    consoleEntries.push({ at: stamp(), surface, type: "error", text: error.message })
  })
  page.on("response", (response) => {
    if (response.status() >= 400) {
      networkEntries.push({
        at: stamp(),
        surface,
        status: response.status(),
        method: response.request().method(),
        url: response.url(),
      })
    }
  })
}

const shot = async (page, name, fullPage = false) => {
  const file = path.join(root, `${name}.png`)
  await page.screenshot({ path: file, fullPage, animations: "disabled" })
  screenshots.push(file)
  return file
}

const runAxe = async (page, route) => {
  const results = await new AxeBuilder({ page }).analyze()
  accessibility.push({
    route,
    violations: results.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      nodes: violation.nodes.length,
      targets: violation.nodes.slice(0, 5).map((node) => node.target),
    })),
  })
}

const layoutCheck = async (page, route, width) => {
  const result = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth
    const offenders = [...document.querySelectorAll("body *")]
      .filter((element) => {
        const rect = element.getBoundingClientRect()
        const style = getComputedStyle(element)
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          style.position !== "fixed" &&
          (rect.right > viewportWidth + 2 || rect.left < -2)
        )
      })
      .slice(0, 12)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        id: element.id,
        className: String(element.className).slice(0, 160),
        text: element.textContent?.trim().slice(0, 80),
        rect: element.getBoundingClientRect().toJSON(),
      }))
    return {
      viewportWidth,
      scrollWidth: document.documentElement.scrollWidth,
      overflow: document.documentElement.scrollWidth > viewportWidth + 2,
      offenders,
    }
  })
  layouts.push({ route, width, ...result })
}

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  colorScheme: "light",
  reducedMotion: "no-preference",
})
const page = await context.newPage()
attachObservers(page, "desktop")

await page.addInitScript(() => {
  window.__auditVitals = { lcp: 0, cls: 0, inp: 0 }
  new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const last = entries[entries.length - 1]
    if (last) window.__auditVitals.lcp = last.startTime
  }).observe({ type: "largest-contentful-paint", buffered: true })
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) window.__auditVitals.cls += entry.value
    }
  }).observe({ type: "layout-shift", buffered: true })
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      window.__auditVitals.inp = Math.max(window.__auditVitals.inp, entry.duration || 0)
    }
  }).observe({ type: "event", buffered: true, durationThreshold: 16 })
})

await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" })
await record("CAPABILITY", "/", "Loaded the public portfolio and queried the primary heading", "h1", await page.locator("h1").first().innerText())
if (label !== "before") {
  await page.keyboard.press("Tab")
  await record("KEYBOARD", "/", "Reached the skip link as the first keyboard stop", ".skip-link", {
    focusedText: await page.evaluate(() => document.activeElement?.textContent?.trim()),
  })
}
if (label !== "before") {
  for (const sectionId of ["projects", "skills", "contact"]) {
    await page.locator(`#${sectionId}`).scrollIntoViewIfNeeded()
    await pause(750)
  }
  await page.evaluate(() => scrollTo({ top: 0 }))
  await pause()
}
const beforeDesktop = await shot(page, "home-desktop", true)
await record("SCREENSHOT", "/", "Captured the desktop baseline", "body", "full-page screenshot", beforeDesktop)

const projectsNav = page.locator('a[href="/#projects"]').first()
await projectsNav.click()
await pause(900)
await record(
  "NAVIGATE",
  "/#projects",
  "Clicked Projects in the primary navigation",
  'a[href="/#projects"]',
  { url: page.url(), scrollY: await page.evaluate(() => Math.round(scrollY)) },
)

const projectBefore = await shot(page, "projects-before-open")
await record("SCREENSHOT", "/#projects", "Captured the project archive before drill-down", "#projects", "viewport screenshot", projectBefore)
await page.locator("#project-devflow-detail").click()
await page.waitForFunction(() => document.querySelector("h1")?.textContent?.includes("DEVFLOW"))
await record("OPEN", "/projects/devflow", "Opened the DevFlow case study", "#project-devflow-detail", { url: page.url(), heading: await page.locator("h1").innerText() })
const projectAfter = await shot(page, "project-detail-after-open", true)
await record("SCREENSHOT", "/projects/devflow", "Captured the opened project detail", "main, section", "full-page screenshot", projectAfter)
await runAxe(page, "/projects/devflow")

const related = page.locator('section:last-of-type a[href^="/projects/"]').first()
if (await related.count()) {
  const relatedHref = await related.getAttribute("href")
  await related.click()
  await page.waitForFunction(() => document.querySelector("h1")?.textContent?.includes("NEXUS FINANCIAL"))
  await record("ROUND_TRIP", page.url().replace(baseUrl, ""), "Opened the first related project", `a[href="${relatedHref}"]`, { url: page.url(), body: (await page.locator("body").innerText()).slice(0, 180) })
  const relatedResult = await shot(page, "related-project-result")
  await record("ASSERT", page.url().replace(baseUrl, ""), "Verified the related project destination", "h1, main", {
    notFound: (await page.locator("body").innerText()).includes("404"),
    heading: await page.locator("h1").innerText(),
  }, relatedResult)
}

await page.goto(`${baseUrl}/#contact`, { waitUntil: "networkidle" })
await page.locator("#contact").scrollIntoViewIfNeeded()
if (label !== "before") {
  await page.locator("#contact-submit").click()
  await pause()
  const validationShot = await shot(page, "contact-validation-error")
  await record("ERROR", "/#contact", "Submitted the empty form and observed inline validation", "#contact-submit", {
    errorsVisible: await page.locator(".t-input-wrap.is-error").count(),
    focusedField: await page.evaluate(() => document.activeElement?.id),
  }, validationShot)
}
await page.locator("#contact-name").fill("Jordan O'Connor")
await page.locator("#contact-email-input").fill("jordan.recruiter@example.com")
await page.locator("#contact-message").fill("Hi Arshad, I would like to discuss a full-stack role. Can we speak this week?")
await record("TYPE", "/#contact", "Completed the contact form with realistic recruiter data", "#contact-name, #contact-email-input, #contact-message", {
  name: await page.locator("#contact-name").inputValue(),
  email: await page.locator("#contact-email-input").inputValue(),
  messageLength: (await page.locator("#contact-message").inputValue()).length,
})
const contactBefore = await shot(page, "contact-before-submit")
await record("SCREENSHOT", "/#contact", "Captured the completed form before submission", "#contact form", "viewport screenshot", contactBefore)
await page.locator("#contact-submit").click()
await pause(1200)
const contactAfter = await shot(page, "contact-after-submit")
await record("SUBMIT", "/#contact", "Submitted the contact form", "#contact-submit", {
  successHeading: await page.getByText(/Message ready/i).count(),
  inputRemoved: await page.locator("#contact-name").count() === 0,
  failedRequests: networkEntries.filter((entry) => entry.surface === "desktop"),
}, contactAfter)
await record("CONSOLE", "/#contact", "Read console after submission", "console", consoleEntries.filter((entry) => entry.surface === "desktop"))

const newMessage = page.getByRole("button", { name: /start over/i })
if (await newMessage.count()) {
  await newMessage.click()
  await record("ASSERT", "/#contact", "Returned to a fresh contact form", 'button[name="New Message"]', { formRestored: await page.locator("#contact-name").count() === 1 })
}

const themeButton = page.getByRole("button", { name: /theme/i }).first()
const themeBefore = await page.locator("html").getAttribute("class")
await themeButton.click()
await pause()
const themeAfter = await page.locator("html").getAttribute("class")
await record("STATE_CHANGE", "/#contact", "Toggled the site theme", 'button[aria-label="Toggle theme"]', { before: themeBefore, after: themeAfter })

await page.goto(`${baseUrl}/does-not-exist`, { waitUntil: "networkidle" })
const notFoundBefore = await shot(page, "not-found")
await record("OPEN", "/does-not-exist", "Opened an invalid route", "URL", { heading: await page.locator("h1").innerText() }, notFoundBefore)
await runAxe(page, "/does-not-exist")

await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" })
await pause(1300)
await runAxe(page, "/")
await record("ASSERT", "/", "Verified hero calls to action point to working destinations", "#home a", {
  projectsHref: await page.locator('#home a[href="#projects"]').getAttribute("href"),
  emailHref: (await page.locator('#home a[href^="mailto:"]').getAttribute("href"))?.slice(0, 36),
  brokenResumeLink: await page.locator('a[href="/resume.pdf"]').count(),
})

for (const width of [1920, 1440, 1280, 1024, 768, 375]) {
  await page.setViewportSize({ width, height: width <= 375 ? 812 : 900 })
  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" })
  await layoutCheck(page, "/", width)
  await page.goto(`${baseUrl}/projects/devflow`, { waitUntil: "domcontentloaded" })
  await layoutCheck(page, "/projects/devflow", width)
}

await page.setViewportSize({ width: 1440, height: 900 })
await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" })
await page.getByRole("button", { name: /theme/i }).first().click()
const vitals = await page.evaluate(() => window.__auditVitals)

const mobileContext = await browser.newContext({
  viewport: { width: 375, height: 812 },
  colorScheme: "light",
  reducedMotion: "reduce",
  isMobile: true,
  hasTouch: true,
})
const mobile = await mobileContext.newPage()
attachObservers(mobile, "mobile")
await mobile.goto(`${baseUrl}/`, { waitUntil: "networkidle" })
if (label !== "before") {
  for (const sectionId of ["projects", "skills", "contact"]) {
    await mobile.locator(`#${sectionId}`).scrollIntoViewIfNeeded()
    await pause(500)
  }
  await mobile.evaluate(() => scrollTo({ top: 0 }))
  await pause()
}
const beforeMobile = await shot(mobile, "home-mobile", true)
await record("SCREENSHOT", "/", "Captured the mobile baseline with reduced motion requested", "body", "full-page screenshot", beforeMobile)
await mobile.locator("#mobile-menu-toggle").click()
const menuOpen = await shot(mobile, "mobile-menu-open")
await record("OPEN", "/", "Opened the mobile navigation", "#mobile-menu-toggle", { expanded: await mobile.locator("#mobile-menu-toggle").getAttribute("aria-expanded") }, menuOpen)
if (label !== "before") {
  await mobile.keyboard.press("Escape")
  await record("KEYBOARD", "/", "Closed the mobile navigation with Escape", "#mobile-menu-toggle", {
    expanded: await mobile.locator("#mobile-menu-toggle").getAttribute("aria-expanded"),
  })
  await mobile.locator("#mobile-menu-toggle").click()
}
await mobile.locator('a[href="/#contact"]').last().click()
await pause(900)
await mobile.locator("#contact-name").fill("Zoë O'Connor")
await mobile.locator("#contact-email-input").fill("zoe@example.com")
await mobile.locator("#contact-message").fill("Hello مرحبا こんにちは <script>alert('audit')</script>")
await record("TYPE", "/#contact", "Entered real-flavour mobile form data", "#contact form", {
  name: await mobile.locator("#contact-name").inputValue(),
  message: await mobile.locator("#contact-message").inputValue(),
})
const mobileContactBefore = await shot(mobile, "mobile-contact-before-submit")
await record("SCREENSHOT", "/#contact", "Captured mobile contact before submission", "#contact form", "viewport screenshot", mobileContactBefore)
await mobile.locator("#contact-submit").click()
await pause(1200)
const mobileContactAfter = await shot(mobile, "mobile-contact-after-submit")
await record("SUBMIT", "/#contact", "Submitted real-flavour data on mobile", "#contact-submit", {
  successHeading: await mobile.getByText(/Message ready/i).count(),
  console: consoleEntries.filter((entry) => entry.surface === "mobile"),
}, mobileContactAfter)

const reducedMotion = await mobile.evaluate(() => {
  const hero = document.querySelector("h1")
  const nav = document.querySelector("nav")
  return {
    requested: matchMedia("(prefers-reduced-motion: reduce)").matches,
    heroTransitionDuration: hero ? getComputedStyle(hero).transitionDuration : null,
    navTransitionDuration: nav ? getComputedStyle(nav).transitionDuration : null,
  }
})

await context.close()
await mobileContext.close()
await browser.close()

const report = {
  label,
  baseUrl,
  persona: "time-pressed recruiter or prospective client, moderately technical, evaluating in a few minutes on laptop and phone",
  generatedAt: stamp(),
  manifest,
  screenshots,
  consoleEntries,
  networkEntries,
  accessibility,
  layouts,
  performance: vitals,
  reducedMotion,
  summary: {
    manifestEntries: manifest.length,
    screenshots: screenshots.length,
    consoleWarnings: consoleEntries.filter((entry) => entry.type === "warning").length,
    consoleErrors: consoleEntries.filter((entry) => entry.type === "error").length,
    network5xx: networkEntries.filter((entry) => entry.status >= 500).length,
    network4xx: networkEntries.filter((entry) => entry.status >= 400 && entry.status < 500).length,
    axeCritical: accessibility.flatMap((entry) => entry.violations).filter((entry) => entry.impact === "critical").length,
    axeSerious: accessibility.flatMap((entry) => entry.violations).filter((entry) => entry.impact === "serious").length,
    layoutCollapses: layouts.filter((entry) => entry.overflow).length,
  },
}

await writeFile(path.join(root, "audit.json"), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))

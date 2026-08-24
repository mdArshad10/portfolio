import { chromium } from "playwright"
import AxeBuilder from "@axe-core/playwright"
import { writeFile } from "node:fs/promises"

const baseUrl = process.env.AUDIT_URL || "http://127.0.0.1:5173"
const browser = await chromium.launch({ headless: true })
const consoleIssues = []
const networkIssues = []
const axe = []

const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await context.newPage()
page.on("console", (message) => {
  if (["warning", "error"].includes(message.type())) {
    consoleIssues.push({ type: message.type(), text: message.text() })
  }
})
page.on("pageerror", (error) => consoleIssues.push({ type: "error", text: error.message }))
page.on("response", (response) => {
  if (response.status() >= 400) {
    networkIssues.push({ status: response.status(), method: response.request().method(), url: response.url() })
  }
})

const checkAxe = async (route) => {
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" })
  await page.waitForTimeout(1400)
  const result = await new AxeBuilder({ page }).analyze()
  axe.push({
    route,
    violations: result.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.length,
      targets: violation.nodes.map((node) => node.target),
    })),
  })
}

await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" })
await page.locator('a[href="/#projects"]').first().click()
await page.locator("#project-devflow-detail").click()
await page.waitForURL("**/projects/devflow")
await page.getByRole("heading", { level: 1, name: "DevFlow", exact: true }).waitFor()
await page.locator('section:last-of-type a[href="/projects/nexus-financial"]').click()
await page.waitForURL("**/projects/nexus-financial")
await page.getByRole("heading", { level: 1, name: "Nexus Financial Analytics", exact: true }).waitFor()
const relatedRoute = { url: page.url(), heading: await page.locator("h1").innerText() }

await page.goto(`${baseUrl}/#contact`, { waitUntil: "networkidle" })
await page.locator("#contact").scrollIntoViewIfNeeded()
await page.locator("#contact-submit").click()
await page.waitForTimeout(350)
const validation = {
  inlineErrors: await page.locator(".t-input-wrap.is-error").count(),
  focusedField: await page.evaluate(() => document.activeElement?.id),
}
await page.locator("#contact-name").fill("Jordan O'Connor")
await page.locator("#contact-email-input").fill("jordan@example.com")
await page.locator("#contact-message").fill("I would like to discuss a full-stack role.")
await page.locator("#contact-submit").click()
await page.getByRole("heading", { name: "Message ready" }).waitFor()
const contact = {
  heading: await page.getByRole("heading", { name: "Message ready" }).innerText(),
  emailDraft: await page.getByRole("link", { name: /open email draft/i }).getAttribute("href"),
}

for (const route of ["/", "/projects/devflow", "/does-not-exist"]) {
  await checkAxe(route)
}

const mobileContext = await browser.newContext({
  viewport: { width: 375, height: 812 },
  isMobile: true,
  hasTouch: true,
  reducedMotion: "reduce",
})
const mobile = await mobileContext.newPage()
await mobile.goto(`${baseUrl}/`, { waitUntil: "networkidle" })
await mobile.locator("#mobile-menu-toggle").click()
const expandedBeforeEscape = await mobile.locator("#mobile-menu-toggle").getAttribute("aria-expanded")
await mobile.keyboard.press("Escape")
const expandedAfterEscape = await mobile.locator("#mobile-menu-toggle").getAttribute("aria-expanded")
const motion = await mobile.evaluate(() => ({
  requested: matchMedia("(prefers-reduced-motion: reduce)").matches,
  hero: getComputedStyle(document.querySelector("h1")).transitionDuration,
  nav: getComputedStyle(document.querySelector("nav")).transitionDuration,
}))

const result = {
  relatedRoute,
  validation,
  contact,
  mobileMenu: { expandedBeforeEscape, expandedAfterEscape },
  motion,
  consoleIssues,
  networkIssues,
  axe,
  summary: {
    consoleErrorsOrWarnings: consoleIssues.length,
    network4xxOr5xx: networkIssues.length,
    axeCritical: axe.flatMap((entry) => entry.violations).filter((violation) => violation.impact === "critical").length,
    axeSerious: axe.flatMap((entry) => entry.violations).filter((violation) => violation.impact === "serious").length,
  },
}

await writeFile("artifacts/ux-audit/after/final-gates.json", JSON.stringify(result, null, 2))
console.log(JSON.stringify(result, null, 2))
await browser.close()

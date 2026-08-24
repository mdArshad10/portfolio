import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, BriefcaseBusiness, Code2, MailCheck, MapPin, Send } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { personalInfo } from "@/data/portfolio"

type ContactStatus = "idle" | "preparing" | "ready"

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.08 })
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<ContactStatus>("idle")
  const successIconRef = useRef<HTMLDivElement>(null)
  const validationTimers = useRef(new Map<HTMLElement, number>())
  const isSubmitting = status === "preparing"
  const emailDraft = `mailto:${personalInfo.email}?subject=${encodeURIComponent(`Portfolio inquiry from ${form.name}`)}&body=${encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`)}`

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus("preparing")
    await new Promise((resolve) => window.setTimeout(resolve, 350))
    setStatus("ready")
  }

  useEffect(() => {
    const icon = successIconRef.current
    if (status !== "ready" || !icon) return
    icon.querySelectorAll<SVGPathElement>("svg path").forEach((path) => {
      const length = Math.ceil(path.getTotalLength()) + 1
      path.style.strokeDasharray = String(length)
      path.style.strokeDashoffset = String(length)
    })
    icon.setAttribute("data-state", "out")
    void icon.offsetWidth
    icon.setAttribute("data-state", "in")
  }, [status])

  useEffect(() => {
    const timers = validationTimers.current
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      timers.clear()
    }
  }, [])

  const clearValidation = (target: HTMLElement) => {
    const wrap = target.closest<HTMLElement>(".t-input-wrap")
    const input = target.closest<HTMLElement>(".t-input")
    if (!wrap || !input) return
    const timer = validationTimers.current.get(wrap)
    if (timer) window.clearTimeout(timer)
    validationTimers.current.delete(wrap)
    wrap.classList.remove("is-error")
    input.classList.remove("is-error", "is-shaking")
  }

  const handleInvalid = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const target = event.target as HTMLInputElement | HTMLTextAreaElement
    const wrap = target.closest<HTMLElement>(".t-input-wrap")
    const input = target.closest<HTMLElement>(".t-input")
    if (!wrap || !input) return

    wrap.classList.add("is-error")
    input.classList.add("is-error")
    input.classList.remove("is-shaking")
    void input.offsetWidth
    input.classList.add("is-shaking")

    const styles = getComputedStyle(document.documentElement)
    const milliseconds = (name: string, fallback: number) => {
      const value = parseFloat(styles.getPropertyValue(name))
      return Number.isFinite(value) ? value : fallback
    }
    const shakeDuration =
      milliseconds("--shake-dur-a", 80) * 2 +
      milliseconds("--shake-dur-b", 60) * 2
    const holdDuration = milliseconds("--revert-hold", 3000)

    const existing = validationTimers.current.get(wrap)
    if (existing) window.clearTimeout(existing)
    const timer = window.setTimeout(() => {
      validationTimers.current.delete(wrap)
      wrap.classList.remove("is-error")
      input.classList.remove("is-error", "is-shaking")
    }, shakeDuration + holdDuration)
    validationTimers.current.set(wrap, timer)

    window.requestAnimationFrame(() => {
      formElement.querySelector<HTMLElement>(".t-input-wrap.is-error .t-input")?.focus()
    })
  }

  return (
    <section id="contact" ref={ref as React.RefObject<HTMLElement>} className="section-space">
      <div className="site-shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div className="reveal" data-visible={inView}>
          <p className="section-kicker mb-4">Contact</p>
          <h2 className="section-title mb-7">Let’s build something useful.</h2>
          <p className="body-copy mb-9">{personalInfo.availability}</p>

          <div className="space-y-4 text-sm">
            <a href={`mailto:${personalInfo.email}`} className="group flex items-center gap-3 font-medium transition-colors hover:text-primary">
              {personalInfo.email}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" /> {personalInfo.location}</p>
          </div>

          <div className="mt-9 flex gap-2">
            <SocialLink href={personalInfo.github} label="GitHub"><Code2 className="h-4 w-4" /></SocialLink>
            <SocialLink href={personalInfo.linkedin} label="LinkedIn"><BriefcaseBusiness className="h-4 w-4" /></SocialLink>
          </div>
        </div>

        <div className="reveal" data-visible={inView} style={{ transitionDelay: "100ms" }}>
          {status === "ready" ? (
            <div className="flex min-h-[31rem] flex-col justify-center rounded-xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] sm:p-10" role="status" aria-live="polite">
              <div ref={successIconRef} className="t-success-check mb-7 grid h-12 w-12 place-items-center rounded-full bg-accent text-primary" data-state="out" aria-hidden="true">
                <MailCheck className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-3xl font-semibold tracking-[-0.04em]">Your email draft is ready.</h3>
              <p className="mb-8 max-w-md leading-7 text-muted-foreground">Nothing has been sent yet. Open the draft in your email app, review it, and press send when you’re ready.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={emailDraft} className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                  Open email draft
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <button type="button" onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }) }} className="min-h-12 rounded-lg px-5 text-sm font-semibold transition-colors hover:bg-muted">
                  Start over
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} onInvalid={handleInvalid} className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8" aria-busy={isSubmitting} noValidate={false}>
              <div className="mb-6 grid gap-5 sm:grid-cols-2">
                <FormField id="contact-name" name="name" label="Your name" type="text" autoComplete="name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} onInput={clearValidation} placeholder="Jane Smith" errorMessage="Enter your name." />
                <FormField id="contact-email-input" name="email" label="Email address" type="email" autoComplete="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} onInput={clearValidation} placeholder="jane@company.com" errorMessage="Enter a valid email address." />
              </div>

              <div className="t-input-wrap mb-6 flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-sm font-medium">Project or role</label>
                <textarea id="contact-message" name="message" rows={6} required aria-describedby="contact-message-error" value={form.message} onChange={(event) => { clearValidation(event.currentTarget); setForm({ ...form, message: event.target.value }) }} placeholder="Tell me what you’re building, hiring for, or hoping to discuss." className="t-input w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-[0.95rem] leading-6 outline-none placeholder:text-muted-foreground/75 focus:border-primary focus:ring-3 focus:ring-primary/10" />
                <p id="contact-message-error" className="t-error-msg text-xs font-medium text-destructive" aria-live="polite">Add a short note about the role or project.</p>
              </div>

              <button type="submit" id="contact-submit" disabled={isSubmitting} className="group inline-flex min-h-12 w-full items-center justify-between rounded-lg bg-foreground px-5 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground disabled:cursor-wait disabled:opacity-60">
                <TransitioningText value={isSubmitting ? "Preparing draft…" : "Prepare email"} />
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function FormField({ id, name, label, type, autoComplete, value, onChange, onInput, placeholder, errorMessage }: { id: string; name: string; label: string; type: string; autoComplete?: string; value: string; onChange: (value: string) => void; onInput: (target: HTMLElement) => void; placeholder: string; errorMessage: string }) {
  return (
    <div className="t-input-wrap flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <input id={id} name={name} type={type} autoComplete={autoComplete} required aria-describedby={`${id}-error`} value={value} onChange={(event) => { onInput(event.currentTarget); onChange(event.target.value) }} placeholder={placeholder} className="t-input min-h-12 w-full rounded-lg border border-input bg-background px-4 text-[0.95rem] outline-none placeholder:text-muted-foreground/75 focus:border-primary focus:ring-3 focus:ring-primary/10" />
      <p id={`${id}-error`} className="t-error-msg text-xs font-medium text-destructive" aria-live="polite">{errorMessage}</p>
    </div>
  )
}

function TransitioningText({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayed, setDisplayed] = useState(value)
  const [phase, setPhase] = useState("")

  useEffect(() => {
    if (value === displayed) return
    const duration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--text-swap-dur")) || 200
    const frame = window.requestAnimationFrame(() => setPhase("is-exit"))
    const timer = window.setTimeout(() => {
      setDisplayed(value)
      setPhase("is-enter-start")
      window.requestAnimationFrame(() => { if (ref.current) void ref.current.offsetHeight; setPhase("") })
    }, duration)
    return () => { window.cancelAnimationFrame(frame); window.clearTimeout(timer) }
  }, [value, displayed])

  return <span ref={ref} className={`t-text-swap ${phase}`}>{displayed}</span>
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-border bg-card px-3.5 text-sm font-medium transition-colors hover:border-foreground/25 hover:bg-muted sm:min-h-11">{children}{label}</a>
}

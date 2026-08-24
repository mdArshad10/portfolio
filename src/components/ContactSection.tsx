import { useEffect, useRef, useState } from "react"
import { MapPin, Send, ArrowRight, MailCheck, Code2, BriefcaseBusiness } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

import { personalInfo } from "@/data/portfolio"

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "preparing" | "ready">("idle")
  const successIconRef = useRef<HTMLDivElement>(null)
  const validationTimers = useRef(new Map<HTMLElement, number>())

  const isSubmitting = status === "preparing"
  const emailDraft = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    `Portfolio inquiry from ${form.name}`,
  )}&body=${encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`)}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("preparing")
    await new Promise((resolve) => window.setTimeout(resolve, 350))
    setStatus("ready")
  }

  useEffect(() => {
    const check = successIconRef.current
    if (status !== "ready" || !check) return

    check.querySelectorAll<SVGPathElement>("svg path").forEach((path) => {
      const length = Math.ceil(path.getTotalLength()) + 1
      path.style.strokeDasharray = String(length)
      path.style.strokeDashoffset = String(length)
    })
    check.setAttribute("data-state", "out")
    void check.offsetWidth
    check.setAttribute("data-state", "in")
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

    const existingTimer = validationTimers.current.get(wrap)
    if (existingTimer) window.clearTimeout(existingTimer)
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
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-32 bg-background border-b-2 border-foreground overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 lg:divide-x-2 lg:divide-foreground">
          
          {/* Left column – info */}
          <div
            className={`transition-all duration-700 ease-out lg:pr-16 xl:pr-24 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
               <span className="font-mono text-xs font-bold tracking-widest uppercase text-primary border border-primary/30 px-3 py-1 bg-primary/5">
                SYS.04 //
              </span>
              <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
                Contact
              </span>
            </div>
            <h2 
              className="text-foreground font-black uppercase tracking-tighter leading-none mb-8"
              style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
            >
              Start a<br/>conversation
            </h2>
            <p className="text-xl text-muted-foreground font-light mb-16 max-w-md">
              {personalInfo.availability}
            </p>

            {/* Contact details - Brutalist Table */}
            <div className="flex flex-col border-t-2 border-l-2 border-r-2 border-foreground mb-16">
              <div className="flex flex-col sm:flex-row border-b-2 border-foreground">
                <div className="bg-foreground text-background font-mono text-xs font-bold uppercase p-4 sm:w-1/3 flex items-center">
                  Email
                </div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="font-mono text-sm sm:text-base font-bold p-4 sm:w-2/3 hover:bg-primary hover:text-primary-foreground transition-colors truncate"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex flex-col sm:flex-row border-b-2 border-foreground">
                <div className="bg-foreground text-background font-mono text-xs font-bold uppercase p-4 sm:w-1/3 flex items-center">
                  Location
                </div>
                <div className="font-mono text-sm sm:text-base font-bold p-4 sm:w-2/3 flex items-center gap-2 truncate">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {personalInfo.location}
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-4">
              <SocialLink href={personalInfo.github} label="GITHUB">
                <Code2 className="h-5 w-5" />
              </SocialLink>
              <SocialLink href={personalInfo.linkedin} label="LINKEDIN">
                <BriefcaseBusiness className="h-5 w-5" />
              </SocialLink>
            </div>
          </div>

          {/* Right column – Contact form */}
          <div
            className={`transition-all delay-200 duration-700 ease-out lg:pl-16 xl:pl-24 flex flex-col justify-center ${
              inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            {status === "ready" ? (
              <div className="flex h-full flex-col items-start justify-center gap-8 border-2 border-primary bg-primary/5 p-8 sm:p-12" role="status" aria-live="polite">
                <div ref={successIconRef} className="t-success-check border-2 border-primary bg-primary p-4 text-primary-foreground" data-state="out" aria-hidden="true">
                  <MailCheck className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="mb-3 text-3xl font-black tracking-tighter uppercase sm:text-4xl">Message ready</h3>
                  <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                    Nothing has been sent yet. Open the prepared draft in your email app, review it, then press send.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <a
                    href={emailDraft}
                    className="group flex min-h-12 items-center gap-3 bg-primary px-6 py-3 font-mono text-sm font-bold tracking-wide text-primary-foreground uppercase"
                  >
                    Open email draft
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <button
                    onClick={() => {
                      setStatus("idle")
                      setForm({ name: "", email: "", message: "" })
                    }}
                    className="font-mono text-sm font-bold uppercase underline decoration-2 underline-offset-8 hover:text-primary"
                  >
                    Start over
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} onInvalid={handleInvalid} className="flex flex-col gap-8" aria-busy={isSubmitting}>
                <div className="flex flex-col gap-8 sm:flex-row">
                  <FormField
                    id="contact-name"
                    label="Your name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    onInput={clearValidation}
                    placeholder="Your name"
                    errorMessage="Enter your name."
                    required
                  />
                  <FormField
                    id="contact-email-input"
                    label="Email address"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    onInput={clearValidation}
                    placeholder="you@example.com"
                    errorMessage="Enter a valid email address."
                    required
                  />
                </div>
                <div className="t-input-wrap flex flex-col gap-3 group">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-xs font-bold uppercase tracking-widest text-foreground group-focus-within:text-primary transition-colors"
                  >
                    Project or role
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    required
                    aria-describedby="contact-message-error"
                    value={form.message}
                    onChange={(e) => {
                      clearValidation(e.currentTarget)
                      setForm({ ...form, message: e.target.value })
                    }}
                    placeholder="Tell me what you're building, hiring for, or hoping to discuss."
                    className="t-input w-full resize-none bg-background border-2 border-foreground/30 px-5 py-4 font-mono text-sm text-foreground transition-colors duration-200 outline-none placeholder:text-muted-foreground focus:border-primary focus:bg-primary/5"
                  />
                  <p id="contact-message-error" className="t-error-msg -mt-1 font-mono text-xs font-bold text-destructive" aria-live="polite">
                    Add a short note about the role or project.
                  </p>
                </div>
                <button
                  type="submit"
                  id="contact-submit"
                  disabled={isSubmitting}
                  className="group relative flex items-center justify-between border-2 border-foreground bg-foreground px-8 py-5 text-background transition-all duration-300 hover:bg-primary hover:border-primary hover:text-primary-foreground disabled:opacity-50 overflow-hidden"
                >
                  <span className="font-mono text-lg font-black uppercase tracking-widest relative z-10">
                    <TransitioningText value={isSubmitting ? "Preparing draft..." : "Prepare email"} />
                  </span>
                  <Send className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 relative z-10" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function FormField({
  id,
  label,
  type,
  autoComplete,
  value,
  onChange,
  onInput,
  placeholder,
  errorMessage,
  required,
}: {
  id: string
  label: string
  type: string
  autoComplete?: string
  value: string
  onChange: (v: string) => void
  onInput: (target: HTMLElement) => void
  placeholder: string
  errorMessage: string
  required?: boolean
}) {
  return (
    <div className="t-input-wrap flex w-full flex-col gap-3 group">
      <label htmlFor={id} className="font-mono text-xs font-bold uppercase tracking-widest text-foreground group-focus-within:text-primary transition-colors">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={id === "contact-name" ? "name" : "email"}
        autoComplete={autoComplete}
        required={required}
        aria-describedby={`${id}-error`}
        value={value}
        onChange={(e) => {
          onInput(e.currentTarget)
          onChange(e.target.value)
        }}
        placeholder={placeholder}
        className="t-input w-full bg-background border-2 border-foreground/30 px-5 py-4 font-mono text-sm text-foreground transition-colors duration-200 outline-none placeholder:text-muted-foreground focus:border-primary focus:bg-primary/5"
      />
      <p id={`${id}-error`} className="t-error-msg -mt-1 font-mono text-xs font-bold text-destructive" aria-live="polite">
        {errorMessage}
      </p>
    </div>
  )
}

function TransitioningText({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayed, setDisplayed] = useState(value)
  const [phase, setPhase] = useState("")

  useEffect(() => {
    if (value === displayed) return

    const duration =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--text-swap-dur"),
      ) || 200
    const frame = window.requestAnimationFrame(() => setPhase("is-exit"))
    const timer = window.setTimeout(() => {
      setDisplayed(value)
      setPhase("is-enter-start")
      window.requestAnimationFrame(() => {
        if (ref.current) void ref.current.offsetHeight
        setPhase("")
      })
    }, duration)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [value, displayed])

  return (
    <span ref={ref} className={`t-text-swap ${phase}`}>
      {displayed}
    </span>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 border-2 border-foreground px-4 py-3 transition-colors duration-200 hover:bg-foreground hover:text-background"
    >
      {children}
      <span className="font-mono text-xs font-bold uppercase tracking-wider">{label}</span>
    </a>
  )
}

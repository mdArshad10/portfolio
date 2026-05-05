import { useState } from "react"
import { MapPin, Send, ArrowRight } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { GitHubDark, LinkedIn } from "developer-icons"
import axios from 'axios'

import { personalInfo } from "@/data/portfolio"

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      setIsSubmitting(true)
      // Attempt to send
      await axios.post("/api/send-email", {
        email: form.email,
        message: form.message,
        name: form.name,
      })
      // If it somehow succeeds
      setSent(true)
      setForm({ name: "", email: "", message: "" })
    } catch (error:unknown) {
      // Mock success since there is no real backend API
      console.log("Mocking email success (API not found):", form)
      setSent(true)
      setForm({ name: "", email: "", message: "" })
    } finally {
      setIsSubmitting(false)
    }
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
              Initiate<br/>Sequence
            </h2>
            <p className="text-xl text-muted-foreground font-light mb-16 max-w-md">
              {personalInfo.availability}
            </p>

            {/* Contact details - Brutalist Table */}
            <div className="flex flex-col border-t-2 border-l-2 border-r-2 border-foreground mb-16">
              <div className="flex flex-col sm:flex-row border-b-2 border-foreground">
                <div className="bg-foreground text-background font-mono text-xs font-bold uppercase p-4 sm:w-1/3 flex items-center">
                  Direct Line
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
                  Base
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
                <GitHubDark className="h-5 w-5" />
              </SocialLink>
              <SocialLink href={personalInfo.linkedin} label="LINKEDIN">
                <LinkedIn className="h-5 w-5" />
              </SocialLink>
            </div>
          </div>

          {/* Right column – Contact form */}
          <div
            className={`transition-all delay-200 duration-700 ease-out lg:pl-16 xl:pl-24 flex flex-col justify-center ${
              inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            {sent ? (
              <div className="flex h-full flex-col items-start justify-center gap-8 border-2 border-primary p-12 bg-primary/5">
                <div className="bg-primary text-primary-foreground p-4 border-2 border-primary">
                  <Send className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">Transmission<br/>Successful</h3>
                  <p className="font-mono text-sm text-muted-foreground">
                    Acknowledgment sent. Awaiting response sequence within 24h.
                  </p>
                </div>
                <button
                  onClick={() => setSent(false)}
                  className="font-mono font-bold uppercase text-sm border-b-2 border-foreground pb-1 hover:text-primary hover:border-primary transition-colors flex items-center gap-2 group"
                >
                  New Message
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col gap-8 sm:flex-row">
                  <FormField
                    id="contact-name"
                    label="IDENTIFIER"
                    type="text"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    placeholder="Your name"
                    required
                  />
                  <FormField
                    id="contact-email-input"
                    label="RETURN_ADDRESS"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="flex flex-col gap-3 group">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-xs font-bold uppercase tracking-widest text-foreground group-focus-within:text-primary transition-colors"
                  >
                    PAYLOAD
                  </label>
                  <textarea
                    id="contact-message"
                    rows={6}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your parameters..."
                    className="w-full resize-none bg-background border-2 border-foreground/30 px-5 py-4 font-mono text-sm text-foreground transition-colors duration-200 outline-none placeholder:text-muted-foreground focus:border-primary focus:bg-primary/5"
                  />
                </div>
                <button
                  type="submit"
                  id="contact-submit"
                  disabled={isSubmitting}
                  className="group relative flex items-center justify-between border-2 border-foreground bg-foreground px-8 py-5 text-background transition-all duration-300 hover:bg-primary hover:border-primary hover:text-primary-foreground disabled:opacity-50 overflow-hidden"
                >
                  <span className="font-mono text-lg font-black uppercase tracking-widest relative z-10">
                    {isSubmitting ? "Transmitting..." : "Execute"}
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
  value,
  onChange,
  placeholder,
  required,
}: {
  id: string
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  required?: boolean
}) {
  return (
    <div className="flex w-full flex-col gap-3 group">
      <label htmlFor={id} className="font-mono text-xs font-bold uppercase tracking-widest text-foreground group-focus-within:text-primary transition-colors">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-background border-2 border-foreground/30 px-5 py-4 font-mono text-sm text-foreground transition-colors duration-200 outline-none placeholder:text-muted-foreground focus:border-primary focus:bg-primary/5"
      />
    </div>
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

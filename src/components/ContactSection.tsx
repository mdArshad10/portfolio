import { useState } from "react"
import { Mail, MapPin, Send } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { GitHubDark, LinkedIn } from "developer-icons"

import { personalInfo } from "@/data/portfolio"

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real project, wire up to an email API
    setSent(true)
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-32"
      style={{ background: "#1c1b1b" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          {/* Left column – info */}
          <div
            className={`transition-all duration-700 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <p className="label-md mb-3 text-[#7F77DD]">Contact</p>
            <h2 className="headline-md mb-6 text-[#e5e2e1]">
              Let's construct something precise.
            </h2>
            <p className="body-md mb-12 max-w-sm text-[#928f9d]">
              {personalInfo.availability}
            </p>

            {/* Contact details */}
            <div className="mb-12 flex flex-col gap-6">
              <div>
                <p className="label-md mb-1 text-[#474552]">Direct Line</p>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="title-sm text-[#c8c4d4] transition-colors duration-200 hover:text-[#c5c0ff]"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div>
                <p className="label-md mb-1 text-[#474552]">
                  Base of Operations
                </p>
                <p className="title-sm flex items-center gap-2 text-[#c8c4d4]">
                  <MapPin className="h-4 w-4 text-[#928f9d]" />
                  {personalInfo.location}
                </p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-6">
              <SocialLink
                href={personalInfo.github}
                label="GITHUB"
                id="contact-github"
              >
                <GitHubDark className="h-4 w-4" />
              </SocialLink>
              <SocialLink
                href={personalInfo.linkedin}
                label="LINKEDIN"
                id="contact-linkedin"
              >
                <LinkedIn className="h-4 w-4" />
              </SocialLink>
              <SocialLink
                href={`mailto:${personalInfo.email}`}
                label="EMAIL"
                id="contact-email"
              >
                <Mail className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          {/* Right column – Contact form */}
          <div
            className={`transition-all delay-200 duration-700 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {sent ? (
              <div className="flex h-full flex-col items-start justify-center gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-sm"
                  style={{
                    background: "rgba(127,119,221,0.15)",
                    border: "1.5px solid #7F77DD",
                  }}
                >
                  <Send className="h-5 w-5 text-[#7F77DD]" />
                </div>
                <h3 className="headline-md text-[#e5e2e1]">Message sent.</h3>
                <p className="body-md text-[#928f9d]">
                  I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="label-md mt-4 text-[#7F77DD] transition-colors hover:text-[#c5c0ff]"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <FormField
                  id="contact-name"
                  label="Name"
                  type="text"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="Your name"
                  required
                />
                <FormField
                  id="contact-email-input"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="you@example.com"
                  required
                />
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="label-md text-[#928f9d]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell me about your project..."
                    className="w-full resize-none rounded-[4px] bg-[#0e0e0e] px-4 py-3 text-sm text-[#e5e2e1] transition-all duration-200 outline-none placeholder:text-[#474552]"
                    style={{
                      border: "0.5px solid rgba(71,69,82,0.4)",
                    }}
                    onFocus={(e) => {
                      e.target.style.border = "1.5px solid #7F77DD"
                    }}
                    onBlur={(e) => {
                      e.target.style.border = "0.5px solid rgba(71,69,82,0.4)"
                    }}
                  />
                </div>
                <button
                  type="submit"
                  id="contact-submit"
                  className="label-md inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#7F77DD] px-6 py-3 text-white transition-all duration-200 hover:bg-[#8C84EB]"
                  style={{ border: "1.5px solid #7F77DD" }}
                >
                  Send Message
                  <Send className="h-4 w-4" />
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
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label-md text-[#928f9d]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[4px] bg-[#0e0e0e] px-4 py-3 text-sm text-[#e5e2e1] transition-all duration-200 outline-none placeholder:text-[#474552]"
        style={{ border: "0.5px solid rgba(71,69,82,0.4)" }}
        onFocus={(e) => {
          e.target.style.border = "1.5px solid #7F77DD"
        }}
        onBlur={(e) => {
          e.target.style.border = "0.5px solid rgba(71,69,82,0.4)"
        }}
      />
    </div>
  )
}

function SocialLink({
  href,
  label,
  id,
  children,
}: {
  href: string
  label: string
  id: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      id={id}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 text-[#928f9d] transition-colors duration-200 hover:text-[#c5c0ff]"
    >
      {children}
      <span className="label-md">{label}</span>
    </a>
  )
}

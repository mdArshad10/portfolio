import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { personalInfo } from "@/data/portfolio"
import { Link } from "react-router-dom"

export function HeroSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-end overflow-hidden pt-32 pb-24"
    >
      {/* Background gradient blob */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-0 left-0 h-[50vh] w-[50vw] rounded-full opacity-10 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #7F77DD 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-0 bottom-0 h-[40vh] w-[40vw] rounded-full opacity-6 blur-[100px]"
          style={{
            background: "radial-gradient(circle, #8C84EB 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(197,192,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,192,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-4xl">
          {/* Overline label */}
          <p
            className={`label-md mb-8 text-[#7F77DD] transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Full Stack Developer
          </p>

          {/* Main heading */}
          <h1
            className={`mb-8 text-[#e5e2e1] transition-all delay-100 duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
            }}
          >
            {personalInfo.tagline}
          </h1>

          {/* Sub-description */}
          <p
            className={`body-md mb-12 max-w-xl text-[#928f9d] transition-all delay-200 duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {personalInfo.subtitle}
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap items-center gap-4 transition-all delay-300 duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Link
              to="#projects"
              id="hero-view-projects"
              className="label-md inline-flex items-center gap-2 rounded-[4px] bg-[#7F77DD] px-6 py-3 text-white transition-all duration-200 hover:bg-[#8C84EB] hover:shadow-lg hover:shadow-[#7F77DD]/20"
              style={{ border: "1.5px solid #7F77DD" }}
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="#contact"
              id="hero-contact"
              className="label-md inline-flex items-center gap-2 rounded-[4px] px-6 py-3 text-[#c5c0ff] transition-all duration-200 hover:bg-[#2a2a2a]"
              style={{ border: "0.5px solid rgba(71,69,82,0.4)" }}
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Floating bottom decoration */}
        <div
          className={`absolute right-12 bottom-0 hidden text-right transition-all delay-500 duration-700 lg:block ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="label-md text-[#474552]">Available for Senior Roles</p>
          <div className="mt-2 flex items-center justify-end gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#7F77DD]" />
            <span className="label-md text-[#7F77DD]">Open to Work</span>
          </div>
        </div>
      </div>
    </section>
  )
}

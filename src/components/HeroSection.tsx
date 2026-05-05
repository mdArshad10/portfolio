import { useEffect, useRef, useState } from "react"
import { ArrowRight, Download } from "lucide-react"
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
      className="relative flex min-h-screen items-center border-b border-border/40 overflow-hidden bg-background"
    >
      {/* Stark Architectural Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
          backgroundPosition: "center center",
        }}
        aria-hidden="true"
      />
      
      {/* Bold diagonal accent line */}
      <div 
        className="pointer-events-none absolute -top-[50%] -right-[20%] h-[200%] w-[1px] bg-primary/20 rotate-[35deg]" 
        aria-hidden="true" 
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pb-20 pt-32">
        
        {/* Main Content (Left heavy, asymmetrical) */}
        <div className="lg:col-span-9 flex flex-col justify-end">
          {/* Overline - Precision style */}
          <div
            className={`flex items-center gap-4 mb-10 transition-all duration-700 ease-out ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-primary border border-primary/30 px-3 py-1 bg-primary/5">
              SYS.01 //
            </span>
            <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
              Full Stack Engineer
            </span>
          </div>

          {/* Extreme Scale Heading */}
          <h1
            className={`text-foreground transition-all delay-100 duration-1000 ease-out ${
              visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{
              fontSize: "clamp(3.5rem, 11vw, 10rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              textTransform: "uppercase",
            }}
          >
            {personalInfo.tagline}
          </h1>
        </div>

        {/* Secondary Info & CTAs (Right column) */}
        <div 
          className={`lg:col-span-3 flex flex-col justify-end lg:pb-4 transition-all delay-300 duration-1000 ease-out ${
            visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          }`}
        >
          {/* Sub-description with stark contrast */}
          <p className="text-lg lg:text-xl font-light text-muted-foreground mb-12 border-l-2 border-primary/50 pl-6 max-w-md leading-relaxed">
            {personalInfo.subtitle}
          </p>

          {/* Bold CTAs */}
          <div className="flex flex-col gap-4">
            <a
              href="/resume.pdf"
              download
              className="group relative flex w-full items-center justify-between bg-primary px-6 py-5 text-primary-foreground transition-all hover:bg-primary/90"
            >
              <span className="font-mono text-sm font-bold tracking-wider uppercase">
                Download Resume
              </span>
              <Download className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
              {/* Brutalist hover shadow */}
              <div className="absolute inset-0 -z-10 translate-x-2 translate-y-2 bg-primary/20 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
            </a>
            
            <Link
              to="#projects"
              className="group flex w-full items-center justify-between border border-border bg-background px-6 py-5 text-foreground transition-colors hover:bg-muted"
            >
              <span className="font-mono text-sm font-bold tracking-wider uppercase">
                View Projects
              </span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom architectural border element */}
      <div 
        className={`absolute bottom-0 left-0 h-[2px] bg-foreground transition-all duration-1000 ease-out ${
          visible ? "w-[15%]" : "w-0"
        }`} 
      />
    </section>
  )
}

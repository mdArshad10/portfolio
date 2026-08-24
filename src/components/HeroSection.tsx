import { useEffect, useRef, useState } from "react"
import { ArrowRight, Mail } from "lucide-react"
import { personalInfo } from "@/data/portfolio"

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
      className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-border/40 bg-background"
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

      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-end gap-10 px-6 pt-28 pb-16 sm:gap-12 sm:pt-32 sm:pb-20 lg:grid-cols-12 lg:px-12">
        
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
              fontSize: "clamp(3rem, 10vw, 9.5rem)",
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
          <p className="mb-10 max-w-md border-l border-primary pl-5 text-base leading-relaxed text-muted-foreground sm:text-lg lg:mb-12 lg:text-xl">
            {personalInfo.subtitle}
          </p>

          {/* Bold CTAs */}
          <div className="flex flex-col gap-4">
            <a
              href="#projects"
              className="group relative flex w-full items-center justify-between bg-primary px-6 py-5 text-primary-foreground transition-all hover:bg-primary/90"
            >
              <span className="font-mono text-sm font-bold tracking-wider uppercase">
                View Projects
              </span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              {/* Brutalist hover shadow */}
              <div className="absolute inset-0 -z-10 translate-x-2 translate-y-2 bg-primary/20 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
            </a>
            
            <a
              href={`mailto:${personalInfo.email}`}
              className="group flex w-full items-center justify-between border border-border bg-background px-6 py-5 text-foreground transition-colors hover:bg-muted"
            >
              <span className="font-mono text-sm font-bold tracking-wider uppercase">
                Email Arshad
              </span>
              <Mail className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
            </a>
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

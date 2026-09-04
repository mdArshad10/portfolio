import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react"
import { personalInfo } from "@/data/portfolio"

export function HeroSection() {
  return (
    <section id="home" className="flex min-h-[92svh] items-center border-b border-border pt-24">
      <div className="site-shell py-16 sm:py-24">
        <div className="grid items-end gap-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Available for new opportunities
            </div>
            <p className="section-kicker mb-5">Full-stack developer · Kolkata, India</p>
            <h1 className="max-w-[14ch] text-[clamp(3.25rem,8vw,7rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-foreground">
              I build useful software, end to end.
            </h1>
          </div>

          <div className="pb-1">
            <p className="mb-8 text-[1.05rem] leading-7 text-muted-foreground">{personalInfo.subtitle}</p>
            <div className="flex flex-col gap-3">
              <a href="#projects" className="group inline-flex min-h-12 items-center justify-between rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                View selected work
                <ArrowDownRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="group inline-flex min-h-12 items-center justify-between rounded-lg border border-border bg-card px-5 text-sm font-semibold transition-colors hover:border-foreground/25 hover:bg-muted">
                Email me
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-5 text-sm text-muted-foreground sm:mt-28">
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {personalInfo.location}</span>
          <span>React · TypeScript · Node.js</span>
          <span>Learning and building with GenAI</span>
        </div>
      </div>
    </section>
  )
}

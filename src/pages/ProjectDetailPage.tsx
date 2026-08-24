import { Link, useParams } from "react-router-dom"
import { ArrowLeft, ArrowUpRight, Code2, ExternalLink } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { projects } from "@/data/portfolio"

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((candidate) => candidate.id === id)
  const relatedProjects = projects.filter((candidate) => candidate.id !== id).slice(0, 2)
  const { ref, inView } = useInView({ threshold: 0.03 })

  if (!project) {
    return (
      <main id="main-content" className="site-shell flex min-h-screen flex-col items-start justify-center py-28">
        <p className="section-kicker mb-4">Project not found</p>
        <h1 className="mb-7 text-4xl font-semibold tracking-[-0.04em]">This project isn’t in the archive.</h1>
        <Link to="/#projects" className="group inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> Back to projects
        </Link>
      </main>
    )
  }

  return (
    <main id="main-content">
      <section className="border-b border-border pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="site-shell">
          <Link to="/#projects" id="project-detail-back" className="group mb-14 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> Back to selected work
          </Link>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{tag}</span>)}
              </div>
              <h1 className="mb-7 max-w-[15ch] text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.055em]">{project.title}</h1>
              <p className="body-copy">{project.shortDesc}</p>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-5 text-sm lg:grid-cols-1">
              <div><dt className="mb-1 text-muted-foreground">Role</dt><dd className="font-medium">{project.role}</dd></div>
              <div><dt className="mb-1 text-muted-foreground">Year</dt><dd className="font-medium">{project.year}</dd></div>
            </dl>
          </div>

          {(project.links.github || project.links.live) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer" id="project-detail-github" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-4 text-sm font-semibold transition-colors hover:bg-muted"><Code2 className="h-4 w-4" /> View source</a>}
              {project.links.live && <a href={project.links.live} target="_blank" rel="noopener noreferrer" id="project-detail-live" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"><ExternalLink className="h-4 w-4" /> Open live project</a>}
            </div>
          )}
        </div>
      </section>

      <section ref={ref as React.RefObject<HTMLElement>} className="section-space border-b border-border">
        <div className="site-shell grid gap-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(15rem,0.7fr)] lg:gap-24">
          <div>
            <div className="reveal mb-16" data-visible={inView}>
              <p className="section-kicker mb-4">Overview</p>
              <p className="max-w-[68ch] text-xl leading-8 tracking-[-0.015em] sm:text-2xl sm:leading-9">{project.description}</p>
            </div>

            <div className="reveal mb-20 grid gap-10 border-y border-border py-10 sm:grid-cols-2" data-visible={inView} style={{ transitionDelay: "70ms" }}>
              <div><h2 className="mb-4 text-lg font-semibold">The problem</h2><p className="leading-7 text-muted-foreground">{project.problem}</p></div>
              <div><h2 className="mb-4 text-lg font-semibold">The approach</h2><p className="leading-7 text-muted-foreground">{project.solution}</p></div>
            </div>

            <div className="reveal" data-visible={inView} style={{ transitionDelay: "120ms" }}>
              <p className="section-kicker mb-4">Key features</p>
              <div className="border-t border-border">
                {project.features.map((feature, index) => (
                  <div key={feature.title} className="grid gap-3 border-b border-border py-7 sm:grid-cols-[2rem_0.8fr_1.2fr]">
                    <span className="text-sm text-muted-foreground">0{index + 1}</span>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="leading-7 text-muted-foreground">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="reveal lg:self-start" data-visible={inView} style={{ transitionDelay: "160ms" }} aria-label="Technology stack">
            <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] lg:sticky lg:top-28">
              <h2 className="mb-6 text-lg font-semibold">Technology stack</h2>
              <div className="space-y-7">
                {Object.entries(project.stack).map(([layer, technologies]) => (
                  <div key={layer}>
                    <h3 className="mb-3 text-xs font-semibold text-muted-foreground">{layer}</h3>
                    <div className="flex flex-wrap gap-2">
                      {(technologies as string[]).map((technology) => <span key={technology} className="rounded-md bg-muted px-2.5 py-1.5 text-xs font-medium">{technology}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-space">
        <div className="site-shell">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div><p className="section-kicker mb-3">Keep exploring</p><h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">More projects</h2></div>
            <Link to="/#projects" id="project-detail-view-all" className="hidden text-sm font-semibold text-primary sm:inline-flex">View all work</Link>
          </div>
          <div className="grid border-t border-border md:grid-cols-2">
            {relatedProjects.map((related, index) => (
              <Link key={related.id} to={`/projects/${related.id}`} className={`group flex min-h-48 flex-col justify-between border-b border-border py-7 transition-colors hover:text-primary ${index === 0 ? "md:border-r md:pr-8" : "md:pl-8"}`}>
                <div><p className="mb-3 text-sm text-muted-foreground">{related.year}</p><h3 className="max-w-sm text-2xl font-semibold tracking-[-0.035em]">{related.title}</h3></div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">Read project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

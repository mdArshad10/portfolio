import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { projects } from "@/data/portfolio"

export function ProjectsSection() {
  const { ref, inView } = useInView({ threshold: 0.05 })

  return (
    <section id="projects" ref={ref as React.RefObject<HTMLElement>} className="section-space border-b border-border">
      <div className="site-shell">
        <div className="reveal mb-14 grid gap-6 md:grid-cols-[1fr_1.5fr] md:items-end" data-visible={inView}>
          <div>
            <p className="section-kicker mb-4">Selected work</p>
            <h2 className="section-title">Products I’ve worked through.</h2>
          </div>
          <p className="body-copy md:justify-self-end">A selection of product problems explored from interface decisions through backend architecture.</p>
        </div>

        <div className="border-t border-border">
          {projects.map((project, index) => (
            <article key={project.id} className="reveal group border-b border-border" data-visible={inView} style={{ transitionDelay: `${Math.min(index * 80, 200)}ms` }}>
              <Link to={`/projects/${project.id}`} id={`project-${project.id}-detail`} className="grid min-h-56 gap-7 py-9 transition-colors hover:text-primary md:grid-cols-[3rem_minmax(0,1fr)_minmax(16rem,0.8fr)_3rem] md:items-center md:py-12">
                <span className="text-sm font-medium text-muted-foreground">0{index + 1}</span>
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                  <h3 className="max-w-xl text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-tight tracking-[-0.04em]">{project.title}</h3>
                </div>
                <div>
                  <p className="mb-3 leading-7 text-muted-foreground">{project.shortDesc}</p>
                  <p className="text-sm font-medium text-muted-foreground">{project.role} · {project.year}</p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-border transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground" aria-hidden="true">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

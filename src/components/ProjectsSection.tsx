import { Link } from "react-router-dom";
import { ArrowRight, Code2, ExternalLink } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { projects } from "@/data/portfolio";

export function ProjectsSection() {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-32 bg-background border-b border-border/40"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        {/* Section header */}
        <div
          className={`mb-20 transition-all duration-700 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
             <span className="font-mono text-xs font-bold tracking-widest uppercase text-primary border border-primary/30 px-3 py-1 bg-primary/5">
              SYS.02 //
            </span>
            <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
              Work
            </span>
          </div>
          <h2 
            className="text-foreground font-black uppercase tracking-tighter leading-none"
            style={{ fontSize: "clamp(4rem, 8vw, 8rem)" }}
          >
            Selected Works
          </h2>
        </div>

        {/* Projects list - Brutalist Table */}
        <div className="border-t-2 border-foreground flex flex-col">
          {projects.map((project, idx) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={idx}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <div
      className={`group relative border-b-2 border-foreground transition-all duration-700 ease-out overflow-hidden ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Stark Hover Fill */}
      <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

      <div className="relative p-6 lg:p-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between transition-colors duration-500 group-hover:text-primary-foreground">
        
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-16 lg:w-2/3">
          {/* Index */}
          <span className="font-mono text-xl font-bold opacity-30 group-hover:opacity-60 transition-opacity">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Main content */}
          <div className="flex flex-col gap-4">
            <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
              {project.title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-sm border border-current px-2 py-1 uppercase font-bold">
                {project.year}
              </span>
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="font-mono text-xs border border-current/30 px-2 py-1 uppercase opacity-80">
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="text-lg lg:text-xl font-light opacity-80 max-w-xl group-hover:text-primary-foreground/90 transition-colors">
              {project.shortDesc}
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 lg:gap-8 shrink-0 self-start lg:self-center">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-${project.id}-github`}
              className="flex items-center gap-2 font-mono text-sm uppercase font-bold hover:underline"
            >
              <Code2 className="h-5 w-5" />
              <span className="hidden sm:inline">Code</span>
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-${project.id}-live`}
              className="flex items-center gap-2 font-mono text-sm uppercase font-bold hover:underline"
            >
              <ExternalLink className="h-5 w-5" />
              <span className="hidden sm:inline">Live</span>
            </a>
          )}
          <Link
            to={`/projects/${project.id}`}
            id={`project-${project.id}-detail`}
            className="flex items-center justify-center h-16 w-16 lg:h-24 lg:w-24 rounded-full border-2 border-current group/link hover:bg-foreground hover:text-background transition-all duration-300 group-hover:border-primary-foreground group-hover:hover:bg-primary-foreground group-hover:hover:text-primary"
            aria-label={`View ${project.title}`}
          >
            <ArrowRight className="h-8 w-8 lg:h-12 lg:w-12 transition-transform duration-300 group-hover/link:-rotate-45" />
          </Link>
        </div>
      </div>
    </div>
  );
}

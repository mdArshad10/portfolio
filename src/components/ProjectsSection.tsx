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
      className="py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section header */}
        <div
          className={`mb-6 flex items-end justify-between transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div>
            <p className="label-md mb-3 text-[#7F77DD]">Work</p>
            <h2 className="headline-md text-[#e5e2e1]">Selected Works</h2>
          </div>
        </div>
        <p
          className={`body-md mb-16 max-w-lg text-[#928f9d] transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          A curated selection of complex technical challenges solved through
          refined interface design.
        </p>

        {/* Projects list */}
        <div className="divide-y" style={{ borderColor: "rgba(71,69,82,0.15)" }}>
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
      className={`group relative py-10 transition-all duration-700 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Hover background */}
      <div className="absolute inset-0 -mx-6 rounded-sm bg-[#1c1b1b] opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:-mx-8" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-16">
        {/* Index + Tags */}
        <div className="flex shrink-0 items-start gap-4 lg:w-48 lg:flex-col lg:gap-3">
          <span
            className="label-md"
            style={{ color: "rgba(146,143,157,0.4)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="mb-3 flex items-baseline gap-4">
            <h3 className="title-sm text-xl text-[#e5e2e1] group-hover:text-[#c5c0ff] transition-colors duration-200">
              {project.title}
            </h3>
            <span className="label-md text-[#474552]">{project.year}</span>
          </div>
          <p className="body-md max-w-2xl text-[#928f9d]">{project.shortDesc}</p>
        </div>

        {/* Links */}
        <div className="flex shrink-0 items-center gap-4 lg:pt-1">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-${project.id}-github`}
              className="label-md flex items-center gap-1.5 text-[#928f9d] transition-colors duration-200 hover:text-[#c5c0ff]"
            >
              <Code2 className="h-3.5 w-3.5" />
              Code
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-${project.id}-live`}
              className="label-md flex items-center gap-1.5 text-[#928f9d] transition-colors duration-200 hover:text-[#c5c0ff]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live
            </a>
          )}
          <Link
            to={`/projects/${project.id}`}
            id={`project-${project.id}-detail`}
            className="label-md flex items-center gap-1.5 text-[#7F77DD] transition-all duration-200 hover:gap-2.5"
          >
            View
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

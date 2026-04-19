import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Code2, ExternalLink } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { projects, relatedProjects } from "@/data/portfolio";

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.05 });
  const { ref: detailRef, inView: detailInView } = useInView({ threshold: 0.05 });

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6">
        <p className="headline-md text-[#e5e2e1]">Project not found.</p>
        <Link
          to="/"
          className="label-md flex items-center gap-2 text-[#7F77DD] hover:text-[#c5c0ff]"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        ref={heroRef as React.RefObject<HTMLElement>}
        className="relative overflow-hidden pb-20 pt-32"
        style={{ background: "#131313" }}
      >
        {/* Purple glow */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-[40vh] w-[40vw] rounded-full opacity-8 blur-[100px]"
          style={{ background: "radial-gradient(circle, #7F77DD 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          {/* Back link */}
          <Link
            to="/"
            id="project-detail-back"
            className={`label-md mb-16 inline-flex items-center gap-2 text-[#928f9d] transition-all duration-300 hover:text-[#c5c0ff] ${
              heroInView ? "opacity-100" : "opacity-0"
            }`}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Projects
          </Link>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto]">
            {/* Title block */}
            <div
              className={`transition-all duration-700 delay-100 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-chip">{tag}</span>
                ))}
              </div>
              <h1
                className="mb-4 text-[#e5e2e1]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.1 }}
              >
                {project.title}
              </h1>
              <p className="body-md text-[#928f9d]">
                {project.shortDesc}
              </p>
            </div>

            {/* Meta block */}
            <div
              className={`flex shrink-0 flex-col justify-start gap-6 lg:items-end transition-all duration-700 delay-200 ${
                heroInView ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="lg:text-right">
                <p className="label-md mb-1 text-[#474552]">Year</p>
                <p className="title-sm text-[#c8c4d4]">{project.year}</p>
              </div>
              <div className="lg:text-right">
                <p className="label-md mb-1 text-[#474552]">Role</p>
                <p className="title-sm text-[#c8c4d4]">{project.role}</p>
              </div>
              <div className="flex gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="project-detail-github"
                    className="inline-flex items-center gap-2 rounded-[4px] px-4 py-2 text-[#c5c0ff] transition-all duration-200 hover:bg-[#2a2a2a] label-md"
                    style={{ border: "0.5px solid rgba(71,69,82,0.4)" }}
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
                    id="project-detail-live"
                    className="inline-flex items-center gap-2 rounded-[4px] bg-[#7F77DD] px-4 py-2 text-white transition-all duration-200 hover:bg-[#8C84EB] label-md"
                    style={{ border: "1.5px solid #7F77DD" }}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "0.5px", background: "rgba(71,69,82,0.2)" }} />

      {/* Detail content */}
      <section
        ref={detailRef as React.RefObject<HTMLElement>}
        className="py-24"
        style={{ background: "#131313" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-24 lg:grid-cols-[2fr_1fr]">
            {/* Left: Description + Features */}
            <div>
              {/* Overview */}
              <div
                className={`mb-16 transition-all duration-700 ${
                  detailInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <p className="body-md text-[#928f9d] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Problem / Solution */}
              <div className="mb-16 grid grid-cols-1 gap-12 sm:grid-cols-2">
                {[
                  { label: "The Problem", content: project.problem },
                  { label: "The Solution", content: project.solution },
                ].map((block, i) => (
                  <div
                    key={block.label}
                    className={`transition-all duration-700 ${
                      detailInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${i * 100 + 100}ms` }}
                  >
                    <p className="label-md mb-4 text-[#7F77DD]">{block.label}</p>
                    <p className="body-md text-[#928f9d]">{block.content}</p>
                  </div>
                ))}
              </div>

              {/* Key Features */}
              <div
                className={`transition-all duration-700 delay-200 ${
                  detailInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <p className="label-md mb-8 text-[#474552]">Key Features</p>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {project.features.map((feat, i) => (
                    <div
                      key={feat.title}
                      className={`rounded-sm p-6 transition-all duration-700 ${
                        detailInView ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        background: "#1c1b1b",
                        border: "0.5px solid rgba(71,69,82,0.2)",
                        transitionDelay: `${i * 80 + 200}ms`,
                      }}
                    >
                      <h4 className="title-sm mb-2 text-[#c8c4d4]">{feat.title}</h4>
                      <p className="body-md text-[#928f9d]">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Tech Stack */}
            <div
              className={`transition-all duration-700 delay-300 ${
                detailInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div
                className="sticky top-24 rounded-sm p-6"
                style={{ background: "#1c1b1b", border: "0.5px solid rgba(71,69,82,0.2)" }}
              >
                <p className="label-md mb-8 text-[#474552]">Tech Stack</p>
                <div className="flex flex-col gap-8">
                  {Object.entries(project.stack).map(([layer, techs]) => (
                    <div key={layer}>
                      <p className="label-md mb-3 text-[#928f9d]">{layer}</p>
                      <div className="flex flex-wrap gap-2">
                        {techs.map((tech:any) => (
                          <span key={tech} className="skill-chip text-[#c8c4d4]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section
        className="py-24"
        style={{ background: "#1c1b1b", borderTop: "0.5px solid rgba(71,69,82,0.2)" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-12 flex items-center justify-between">
            <p className="label-md text-[#474552]">More Work</p>
            <Link
              to="/#projects"
              id="project-detail-view-all"
              className="label-md flex items-center gap-1.5 text-[#7F77DD] transition-all duration-200 hover:gap-2.5 hover:text-[#c5c0ff]"
            >
              View All Work <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {relatedProjects.map((rp) => (
              <div
                key={rp.id}
                className="group rounded-sm p-6 transition-all duration-200 hover:border-[#7F77DD]"
                style={{ background: "#201f1f", border: "0.5px solid rgba(71,69,82,0.2)" }}
              >
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="title-sm text-[#e5e2e1] group-hover:text-[#c5c0ff] transition-colors">
                    {rp.title}
                  </h3>
                  <span className="label-md text-[#474552]">{rp.year}</span>
                </div>
                <p className="body-md mb-4 text-[#928f9d]">{rp.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {rp.tags.map((tag) => (
                    <span key={tag} className="tag-chip">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

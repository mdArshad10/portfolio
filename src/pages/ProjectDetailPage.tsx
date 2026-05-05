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
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background">
        <p className="font-mono text-xl font-bold uppercase text-foreground">Project not found.</p>
        <Link
          to="/"
          className="font-mono text-sm font-bold uppercase flex items-center gap-2 border-b-2 border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Return to Base
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        ref={heroRef as React.RefObject<HTMLElement>}
        className="relative overflow-hidden pb-24 pt-32 sm:pt-40 border-b-2 border-foreground"
      >
        {/* Architectural Background */}
        <div className="absolute inset-0 z-0 opacity-20" aria-hidden="true">
          <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          {/* Back link */}
          <Link
            to="/"
            id="project-detail-back"
            className={`font-mono text-xs font-bold uppercase tracking-widest mb-16 inline-flex items-center gap-2 text-muted-foreground border-b-2 border-transparent pb-1 transition-all duration-300 hover:text-foreground hover:border-foreground ${
              heroInView ? "opacity-100" : "opacity-0"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Archive
          </Link>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_auto]">
            {/* Title block */}
            <div
              className={`transition-all duration-700 ease-out delay-100 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs font-bold tracking-widest uppercase text-primary border border-primary/30 px-3 py-1 bg-primary/5">
                  SYS.02 //
                </span>
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs font-bold tracking-widest uppercase text-foreground border-2 border-foreground px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <h1
                className="mb-8 text-foreground font-black uppercase tracking-tighter leading-none"
                style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
              >
                {project.title}
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed">
                {project.shortDesc}
              </p>
            </div>

            {/* Meta block */}
            <div
              className={`flex shrink-0 flex-col justify-end lg:items-end transition-all duration-700 ease-out delay-200 ${
                heroInView ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex flex-col border-2 border-foreground mb-8 bg-background">
                <div className="flex border-b-2 border-foreground">
                  <div className="bg-foreground text-background font-mono text-xs font-bold uppercase p-3 lg:w-24 flex items-center">
                    Year
                  </div>
                  <div className="font-mono text-sm font-bold p-3 lg:w-40 flex items-center">
                    {project.year}
                  </div>
                </div>
                <div className="flex">
                  <div className="bg-foreground text-background font-mono text-xs font-bold uppercase p-3 lg:w-24 flex items-center">
                    Role
                  </div>
                  <div className="font-mono text-sm font-bold p-3 lg:w-40 flex items-center">
                    {project.role}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 lg:justify-end">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="project-detail-github"
                    className="font-mono text-sm font-bold uppercase tracking-widest flex items-center gap-2 border-2 border-foreground px-6 py-4 transition-all duration-300 hover:bg-foreground hover:text-background"
                  >
                    <Code2 className="h-4 w-4" />
                    Source
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="project-detail-live"
                    className="font-mono text-sm font-bold uppercase tracking-widest flex items-center gap-2 border-2 border-primary bg-primary text-primary-foreground px-6 py-4 transition-all duration-300 hover:bg-background hover:text-primary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Deploy
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail content */}
      <section
        ref={detailRef as React.RefObject<HTMLElement>}
        className="py-24 sm:py-32 bg-background"
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-24 lg:grid-cols-[2fr_1fr] lg:divide-x-2 lg:divide-foreground">
            {/* Left: Description + Features */}
            <div className="lg:pr-16 xl:pr-24">
              {/* Overview */}
              <div
                className={`mb-24 transition-all duration-700 ease-out ${
                  detailInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">
                  // Context_
                </div>
                <p className="text-xl text-foreground font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Problem / Solution */}
              <div className="mb-24 grid grid-cols-1 gap-16 lg:grid-cols-2">
                {[
                  { label: "01 // The Problem", content: project.problem },
                  { label: "02 // The Solution", content: project.solution },
                ].map((block, i) => (
                  <div
                    key={block.label}
                    className={`transition-all duration-700 ease-out ${
                      detailInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${i * 100 + 100}ms` }}
                  >
                    <p className="font-mono text-xs font-bold tracking-widest uppercase text-primary border-b-2 border-primary pb-2 mb-6">
                      {block.label}
                    </p>
                    <p className="text-lg text-muted-foreground font-light leading-relaxed">
                      {block.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Key Features */}
              <div
                className={`transition-all duration-700 ease-out delay-200 ${
                  detailInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <p className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground mb-8">
                  // Core_Features_
                </p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {project.features.map((feat, i) => (
                    <div
                      key={feat.title}
                      className={`group border-2 border-foreground p-8 transition-all duration-500 hover:bg-primary hover:border-primary hover:text-primary-foreground ${
                        detailInView ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ transitionDelay: `${i * 80 + 200}ms` }}
                    >
                      <h4 className="font-mono text-sm font-bold uppercase tracking-wider mb-4 transition-colors">
                        {feat.title}
                      </h4>
                      <p className="text-muted-foreground font-light transition-colors group-hover:text-primary-foreground/90">
                        {feat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Tech Stack */}
            <div
              className={`transition-all duration-700 ease-out delay-300 lg:pl-16 xl:pl-24 ${
                detailInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="sticky top-32 border-2 border-foreground bg-foreground text-background p-8">
                <div className="flex items-center justify-between border-b-2 border-background/20 pb-4 mb-8">
                  <p className="font-mono text-xs font-bold uppercase tracking-widest">
                    System_Architecture
                  </p>
                  <div className="flex gap-2">
                    <div className="h-2 w-2 bg-background/50 rounded-full" />
                    <div className="h-2 w-2 bg-background/50 rounded-full" />
                    <div className="h-2 w-2 bg-background rounded-full" />
                  </div>
                </div>
                <div className="flex flex-col gap-10">
                  {Object.entries(project.stack).map(([layer, techs]) => (
                    <div key={layer}>
                      <p className="font-mono text-xs font-bold uppercase tracking-widest text-background/60 mb-4">
                        {layer}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {techs.map((tech:any) => (
                          <span key={tech} className="font-mono text-xs font-bold uppercase border border-background/30 px-3 py-1 bg-background/5 transition-colors hover:bg-background hover:text-foreground">
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
      <section className="py-24 sm:py-32 bg-background border-t-2 border-foreground">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
              Adjacent<br/>Systems
            </h2>
            <Link
              to="/#projects"
              id="project-detail-view-all"
              className="font-mono text-sm font-bold uppercase tracking-widest flex items-center gap-2 border-b-2 border-foreground pb-1 hover:text-primary hover:border-primary transition-colors group"
            >
              View Full Archive 
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((rp) => (
              <Link
                key={rp.id}
                to={`/project/${rp.id}`}
                className="group flex flex-col justify-between border-2 border-foreground p-8 transition-all duration-300 hover:bg-foreground hover:text-background"
              >
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary group-hover:text-background">
                      {rp.year}
                    </span>
                    <ArrowRight className="h-5 w-5 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">
                    {rp.title}
                  </h3>
                  <p className="font-light text-muted-foreground group-hover:text-background/80 mb-8 line-clamp-3">
                    {rp.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {rp.tags.slice(0,3).map((tag) => (
                    <span key={tag} className="font-mono text-[10px] font-bold uppercase border border-foreground/30 px-2 py-1 group-hover:border-background/30">
                      {tag}
                    </span>
                  ))}
                  {rp.tags.length > 3 && (
                    <span className="font-mono text-[10px] font-bold uppercase border border-foreground/30 px-2 py-1 group-hover:border-background/30">
                      +{rp.tags.length - 3}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

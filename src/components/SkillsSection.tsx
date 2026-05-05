import { useInView } from "@/hooks/use-in-view";
import { skills } from "@/data/portfolio";

export function SkillsSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-32 bg-background border-b border-border/40 overflow-hidden"
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
              SYS.03 //
            </span>
            <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
              Arsenal
            </span>
          </div>
          <h2 
            className="text-foreground font-black uppercase tracking-tighter leading-none"
            style={{ fontSize: "clamp(4rem, 8vw, 8rem)" }}
          >
            Technical Arsenal
          </h2>
        </div>

        {/* Skills grid - Brutalist */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12">
          {Object.entries(skills).map(([category, items], catIdx) => (
            <div
              key={category}
              className={`group flex flex-col border-2 border-foreground bg-background transition-all duration-700 ease-out ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${catIdx * 150}ms` }}
            >
              <div className="border-b-2 border-foreground p-6 bg-foreground text-background">
                <h3 className="font-black text-2xl uppercase tracking-tight">
                  {category}
                </h3>
              </div>
              <div className="p-6 flex flex-wrap gap-3">
                {items.map((skill, idx) => (
                  <SkillRow key={skill} skill={skill} delay={idx * 50 + catIdx * 100} inView={inView} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillRow({
  skill,
  delay,
  inView,
}: {
  skill: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <span
      className={`font-mono text-sm font-bold uppercase border-2 border-foreground px-3 py-2 transition-all duration-300 hover:bg-primary hover:border-primary hover:text-primary-foreground cursor-default ${
        inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {skill}
    </span>
  );
}

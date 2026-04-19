import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { skills } from "@/data/portfolio";

export function SkillsSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-32"
      style={{ background: "#1c1b1b" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section header */}
        <div
          className={`mb-20 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="label-md mb-3 text-[#7F77DD]">Arsenal</p>
          <h2 className="headline-md text-[#e5e2e1]">Technical Arsenal</h2>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(skills).map(([category, items], catIdx) => (
            <div
              key={category}
              className={`transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${catIdx * 100}ms` }}
            >
              <p className="label-md mb-6 text-[#928f9d]">{category}</p>
              <div className="flex flex-col gap-3">
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
    <div
      className={`group flex items-center gap-3 transition-all duration-500 ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span
        className="h-px flex-1 bg-[#474552] transition-all duration-300 group-hover:bg-[#7F77DD]"
        style={{ maxWidth: "24px" }}
      />
      <span className="title-sm text-[#c8c4d4] transition-colors duration-200 group-hover:text-[#c5c0ff]">
        {skill}
      </span>
    </div>
  );
}

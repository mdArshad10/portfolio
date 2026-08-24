import { useInView } from "@/hooks/use-in-view"
import { skills } from "@/data/portfolio"

export function SkillsSection() {
  const { ref, inView } = useInView({ threshold: 0.08 })

  return (
    <section id="skills" ref={ref as React.RefObject<HTMLElement>} className="section-space border-b border-border bg-secondary/45">
      <div className="site-shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="reveal lg:sticky lg:top-28 lg:self-start" data-visible={inView}>
          <p className="section-kicker mb-4">Technical capabilities</p>
          <h2 className="section-title mb-6">A practical full-stack toolkit.</h2>
          <p className="body-copy">Technologies I use to take web products from a clear interface to a dependable deployment.</p>
        </div>

        <div className="border-t border-border">
          {Object.entries(skills).map(([category, items], index) => (
            <div key={category} className="reveal grid gap-4 border-b border-border py-7 sm:grid-cols-[12rem_1fr]" data-visible={inView} style={{ transitionDelay: `${Math.min(index * 55, 260)}ms` }}>
              <div>
                <h3 className="text-sm font-semibold">{category}</h3>
                {category === "GenAI & Automation" && <p className="mt-1 text-xs text-primary">Currently learning and building</p>}
              </div>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] text-muted-foreground">
                {items.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

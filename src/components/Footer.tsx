import { personalInfo } from "@/data/portfolio"

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="site-shell flex flex-col gap-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {personalInfo.name}</p>
        <div className="flex flex-wrap gap-5">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">GitHub</a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">LinkedIn</a>
          <a href={`mailto:${personalInfo.email}`} className="transition-colors hover:text-foreground">Email</a>
        </div>
      </div>
    </footer>
  )
}

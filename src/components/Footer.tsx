import { personalInfo } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-2 border-foreground bg-foreground py-10 text-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-12">
        <p className="label-md text-background/80">
          © {year} {personalInfo.name}. Built with precision.
        </p>
        <div className="flex items-center gap-6">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="label-md text-background/80 transition-colors duration-200 hover:text-background"
          >
            Source Code
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="label-md text-background/80 transition-colors duration-200 hover:text-background"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="label-md text-background/80 transition-colors duration-200 hover:text-background"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

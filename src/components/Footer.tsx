import { personalInfo } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-10"
      style={{
        borderTop: "0.5px solid rgba(71,69,82,0.2)",
        background: "#0e0e0e",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-12">
        <p className="label-md text-[#474552]">
          © {year} {personalInfo.name}. Built with precision.
        </p>
        <div className="flex items-center gap-6">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="label-md text-[#474552] transition-colors duration-200 hover:text-[#928f9d]"
          >
            Source Code
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="label-md text-[#474552] transition-colors duration-200 hover:text-[#928f9d]"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="label-md text-[#474552] transition-colors duration-200 hover:text-[#928f9d]"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

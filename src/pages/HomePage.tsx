import { HeroSection } from "@/components/HeroSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}

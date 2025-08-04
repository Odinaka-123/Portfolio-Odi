import { Navigation } from "@/components/navigation"
import { ProfileHero } from "@/components/profile-hero"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <ProfileHero />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}

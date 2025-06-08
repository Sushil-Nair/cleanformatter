import { Header } from "@/components/header"
import { AboutSection } from "@/components/sections/about"
import { CtaSection } from "@/components/sections/cta"
import { FeaturesSection } from "@/components/sections/features"
import { Footer } from "@/components/sections/footer"
import { HeroSection } from "@/components/sections/hero"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto">
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
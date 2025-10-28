import AdUnit from "@/components/ad-unit";
import { Header } from "@/components/header";
import { AboutSection } from "@/components/sections/about";
import { CtaSection } from "@/components/sections/cta";
import { FeaturesSection } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero";
import ToolSearch from "@/components/toolSearch";
import { toolCategories } from "@/lib/tool-categories";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <ToolSearch toolCategories={toolCategories} />
      <main className="flex-1 w-full mx-auto">
        <HeroSection />
        <AdUnit slot="9721370550" format="horizontal" closeable />
        <FeaturesSection />
        <AboutSection />
        <CtaSection />
      </main>
      <AdUnit
        slot="8328397831"
        format="horizontal"
        closeable
        className="sticky bottom-0"
      />
    </div>
  );
}

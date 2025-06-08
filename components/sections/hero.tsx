import { Button } from "@/components/ui/button"
import { ToolGrid } from "@/components/tool-grid"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Text Tools & Utilities
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              A comprehensive collection of text manipulation and formatting tools for developers and writers
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/tools">Explore Tools</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
        
        <div id="tools" className="scroll-mt-24">
          <ToolGrid />
        </div>
      </div>
    </section>
  )
}
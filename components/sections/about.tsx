import { Button } from "@/components/ui/button"
import { Laptop, Smartphone, Zap } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 scroll-mt-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm">
              About Case Converter
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Built for Writers, Developers, and Everyone in Between
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Case Converter was created to solve a common problem: the need to quickly transform text between different case formats without disrupting your workflow.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Distraction-Free Design</h3>
                  <p className="text-muted-foreground">
                    Our minimal interface lets you focus on your content, not the tool.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Laptop className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Works Offline</h3>
                  <p className="text-muted-foreground">
                    As a Progressive Web App, Case Converter works even without an internet connection.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Available Everywhere</h3>
                  <p className="text-muted-foreground">
                    Use on desktop, tablet, or mobile with a consistent experience across all devices.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="rounded-full px-8">
                <a href="#tools">Get Started</a>
              </Button>
              <Button variant="outline" className="rounded-full px-8">
                View Documentation
              </Button>
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0 rounded-xl overflow-hidden aspect-video shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl"></div>
            <img 
              src="https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
              alt="Person typing on laptop" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
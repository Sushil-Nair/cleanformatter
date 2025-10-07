import AdUnit from "@/components/ad-unit";

export function MidSectionAd() {
  return (
    <section className="relative">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center text-center space-y-4 mb-12">
          <AdUnit
            slot="mid-content"
            format="rectangle"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16"
          />
          <AdUnit
            slot="mid-content"
            format="rectangle"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16"
          />
        </div>
      </div>
    </section>
  );
}

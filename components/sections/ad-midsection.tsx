"use client";

import AdUnit from "@/components/ad-unit";

export function MidSectionAd() {
  return (
    <section className="relative">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center text-center space-y-4">
          <AdUnit
            slot="7628849242"
            format="rectangle"
            className="mx-auto px-4 sm:px-6 lg:px-8"
          />
          <AdUnit
            slot="4839034372"
            format="rectangle"
            className="mx-auto px-4 sm:px-6 lg:px-8"
          />
        </div>
      </div>
    </section>
  );
}

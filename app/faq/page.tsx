// app/faq/page.tsx
import AdUnit from "@/components/ad-unit";
import GeneralFAQ, { FAQStructuredData } from "@/components/GeneralFAQ";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "FAQ - Frequently Asked Questions | Your Site",
  description:
    "Find answers to common questions about our free text editing, formatting, and generation tools.",
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <FAQStructuredData />
      <main className="w-full relative mx-auto px-4 py-8 flex flex-col md:flex-row gap-4">
        <div className="sticky top-40 hidden md:grid grid-cols-1 w-full items-center flex-1 gap-4">
          <AdUnit slot="faq-side" format="square" />
          <AdUnit slot="faq-side" format="square" />
          <AdUnit slot="faq-side" format="square" />
          <AdUnit slot="faq-side" format="square" />
        </div>
        <GeneralFAQ className="flex-3" />
        <AdUnit
          slot="sidebar"
          format="vertical"
          className="sticky top-40 flex-1"
        />
      </main>
      <AdUnit
        slot="footer-ad"
        format="horizontal"
        closeable
        className="sticky bottom-0"
      />
      <Footer />
    </>
  );
}

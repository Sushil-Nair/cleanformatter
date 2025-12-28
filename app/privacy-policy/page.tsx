// import AdUnit from "@/components/ad-unit";
import BreadcrumbAuto from "@/components/BreadcrumbAuto";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { generatePageMetadata } from "@/lib/seo-metadata";
import { Shield, Lock, FileText, Mail, Scale } from "lucide-react";

export const metadata = generatePageMetadata({
  title: "Privacy Policy | Clean Formatter - Your Data is Safe",
  description:
    "Clean Formatter is built on a privacy-first philosophy. All text processing happens locally in your browser—your data never reaches our servers.",
  canonical: "https://cleanformatter.com/privacy-policy",
  type: "website",
});

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - Clean Formatter",
    "description": "Privacy Policy for Clean Formatter text and code tools.",
    "publisher": {
      "@type": "Organization",
      "name": "Clean Formatter",
      "url": "https://cleanformatter.com"
    },
    "dateModified": lastUpdated
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbAuto pathname="/privacy-policy" />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Shield className="h-10 w-10 text-primary" />
                <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Clean Formatter is designed with a &quot;Privacy-First&quot; architecture. 
                This document details our commitment to your data security.
              </p>
              <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
            </div>

            <Separator />

            {/* Quick Summary Card - Optimized for Trust */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Lock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">The Local-First Guarantee</h2>
                    <p className="text-muted-foreground">
                      Clean Formatter utilizes <strong>client-side processing</strong>. All text 
                      transformations happen inside your browser&apos;s memory. Your sensitive 
                      text content is <strong>never uploaded, stored, or transmitted</strong> to our servers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              {/* Data Collection */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Information We (Don&apos;t) Collect</h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Text & Code Snippets</h3>
                      <p className="text-muted-foreground italic">We do not collect this data.</p>
                      <p className="text-muted-foreground mt-2">All inputs remain on your device. We have no technical way to view the text you format.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Advertising & Third-Party Cookies</h3>
                      <p className="text-muted-foreground">
                        We use Google AdSense to serve ads. Google may use cookies (like the DART cookie) 
                        to serve ads based on your visit to this and other sites on the Internet. 
                        You may opt out of personalized advertising by visiting Google Ad Settings.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Legal Rights Section - Vital for Compliance */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Scale className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Your Global Privacy Rights</h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <p className="text-muted-foreground">
                      Regardless of your location, Clean Formatter respects the principles of the 
                      <strong> GDPR</strong> and <strong>CCPA</strong>. You have the right to 
                      browse without being tracked, the right to data portability (via our 
                      download tools), and the right to absolute data minimization.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Corrected Contact Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Legal Contact</h2>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      For privacy inquiries or data requests, contact our founder directly:
                    </p>
                    <div className="space-y-2 text-muted-foreground font-medium">
                      <p>Email: cleanformatter@gmail.com</p>
                      <p>Website: cleanformatter.com</p>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

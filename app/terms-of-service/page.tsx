// import AdUnit from "@/components/ad-unit";
import BreadcrumbAuto from "@/components/BreadcrumbAuto";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { generatePageMetadata } from "@/lib/seo-metadata";
import { FileText, Gavel, Users, Mail, ShieldCheck, Scale } from "lucide-react";

export const metadata = generatePageMetadata({
  title: "Terms of Service | Clean Formatter - Usage Guidelines",
  description:
    "Read the Clean Formatter Terms of Service. Learn about our client-side processing, intellectual property, and user responsibilities for our text and code tools.",
  canonical: "https://cleanformatter.com/terms-of-service",
  type: "website",
});

export default function TermsOfServicePage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service - Clean Formatter",
    "description": "Terms and conditions for using Clean Formatter tools.",
    "publisher": {
      "@type": "Organization",
      "name": "Clean Formatter",
      "url": "https://cleanformatter.com"
    },
    "datePublished": "2024-01-01", // Update to your launch date
    "dateModified": lastUpdated
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbAuto pathname="/terms-of-service" />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Gavel className="h-10 w-10 text-primary" />
                <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Please read these terms carefully. They govern your use of the 
                <strong> Clean Formatter</strong> suite of text and code processing utilities.
              </p>
              <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
            </div>

            <Separator />

            {/* Quick Summary */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Service Overview</h2>
                    <p className="text-muted-foreground">
                      Clean Formatter provides <strong>free, browser-based</strong> tools. By using our service, 
                      you acknowledge that all processing occurs locally on your device. We provide 
                      these tools &quot;as is&quot; for professional and personal use.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="space-y-8">
              {/* Acceptance and Service Description */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">1. Agreement to Terms</h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      By accessing <strong>Clean Formatter</strong> (&quot;the Service&quot;), you agree 
                      to be bound by these Terms. If you disagree with any part of these terms, 
                      you may not access the service.
                    </p>
                    <p>
                      Clean Formatter is a collection of utilities including case converters, 
                      code formatters, and analysis tools. These tools operate <strong>client-side </strong> 
                       via JavaScript; your data is never sent to our servers.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Intellectual Property */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Scale className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">2. Proprietary Rights</h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4 text-muted-foreground">
                    <p>
                      The design, code, branding, and &quot;Smart Case&quot; logic of Clean Formatter 
                      are the intellectual property of the Service. You are granted a limited 
                      license to use these tools for personal or commercial projects.
                    </p>
                    <p>
                      <strong>Your Content:</strong> You retain 100% ownership of any text or code 
                      you process through our tools. We do not claim rights to your inputs or outputs.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Disclaimers */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">3. Technical Disclaimers</h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4 text-muted-foreground">
                    <p>
                      <strong>Accuracy:</strong> While our smart engine is designed to protect 
                      acronyms and brand names, we do not guarantee 100% accuracy. Users are 
                      responsible for verifying the final output of any transformation.
                    </p>
                    <p>
                      <strong>No Warranty:</strong> Clean Formatter is provided &quot;as available.&quot; 
                      We disclaim all warranties of merchantability or fitness for a particular purpose.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Contact Information */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">4. Contact Information</h2>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      For questions regarding these Terms or the operation of the tools:
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
      {/* <AdUnit
        slot="8328397831"
        format="horizontal"
        className="sticky bottom-0 "
        closeable
      /> */}
    </div>
  );
}

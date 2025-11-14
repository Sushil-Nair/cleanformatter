// import AdUnit from "@/components/ad-unit";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, Lock, Users, FileText, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Shield className="h-10 w-10 text-primary" />
                <h1 className="text-4xl font-bold tracking-tight">
                  Privacy Policy
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your privacy is important to us. This policy explains how Clean
                Formatter handles your data.
              </p>
              <p className="text-sm text-muted-foreground">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <Separator />

            {/* Quick Summary */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Eye className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Privacy at a Glance
                    </h2>
                    <p className="text-muted-foreground">
                      Clean Formatter is a client-side text processing tool.
                      Your text data is processed locally in your browser and is
                      never sent to our servers. We don&apos;t collect, store,
                      or share your personal text content.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="space-y-8">
              {/* Data Collection */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">What Data We Collect</h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Text Content
                      </h3>
                      <p className="text-muted-foreground">
                        All text you input into our tools is processed entirely
                        within your browser. This data never leaves your device
                        and is not transmitted to our servers.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Usage Analytics
                      </h3>
                      <p className="text-muted-foreground">
                        We may collect anonymous usage statistics such as which
                        tools are used most frequently, general performance
                        metrics, and error reports. This data contains no
                        personal information or text content.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Technical Information
                      </h3>
                      <p className="text-muted-foreground">
                        We may collect basic technical information such as
                        browser type, device type, and general location (country
                        level) to improve our service. This information is
                        anonymized and cannot be used to identify you.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* How We Use Data */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">How We Use Your Data</h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Service Provision
                      </h3>
                      <p className="text-muted-foreground">
                        Your text data is used solely to provide the text
                        processing services you request. All processing happens
                        locally in your browser.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Service Improvement
                      </h3>
                      <p className="text-muted-foreground">
                        Anonymous usage data helps us understand which features
                        are most valuable and identify areas for improvement.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Technical Support
                      </h3>
                      <p className="text-muted-foreground">
                        Error reports and performance data help us identify and
                        fix technical issues to provide a better user
                        experience.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Data Security */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Lock className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Data Security</h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Client-Side Processing
                      </h3>
                      <p className="text-muted-foreground">
                        All text processing occurs within your browser using
                        JavaScript. Your text content never leaves your device,
                        providing the highest level of privacy and security.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        HTTPS Encryption
                      </h3>
                      <p className="text-muted-foreground">
                        Our website uses HTTPS encryption to protect any data
                        transmitted between your browser and our servers.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        No Data Storage
                      </h3>
                      <p className="text-muted-foreground">
                        We do not store your text content on our servers. When
                        you close your browser or navigate away, your data is
                        automatically cleared.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Third-Party Services */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Third-Party Services</h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                      <p className="text-muted-foreground">
                        We may use analytics services to understand how our
                        tools are used. These services only receive anonymized
                        data and cannot access your text content.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Content Delivery
                      </h3>
                      <p className="text-muted-foreground">
                        We use content delivery networks (CDNs) to serve our
                        application files efficiently. These services do not
                        have access to your text data.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Your Rights */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Your Rights</h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Data Control
                      </h3>
                      <p className="text-muted-foreground">
                        Since your text data never leaves your browser, you have
                        complete control over it. You can clear your browser
                        data at any time to remove any locally stored
                        information.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Opt-Out</h3>
                      <p className="text-muted-foreground">
                        You can disable analytics and tracking by using browser
                        settings, ad blockers, or privacy extensions. This will
                        not affect the functionality of our text processing
                        tools.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Data Portability
                      </h3>
                      <p className="text-muted-foreground">
                        Our tools include export and download features, allowing
                        you to save your processed text in various formats.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Cookies */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">
                    Cookies and Local Storage
                  </h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Essential Cookies
                      </h3>
                      <p className="text-muted-foreground">
                        We use essential cookies and local storage to remember
                        your preferences (such as theme settings) and provide a
                        better user experience.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Analytics Cookies
                      </h3>
                      <p className="text-muted-foreground">
                        We may use analytics cookies to understand how our
                        service is used. These cookies do not contain personal
                        information or text content.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Children's Privacy */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">
                    Children&apos;s Privacy
                  </h2>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">
                      Our service is not directed to children under 13. We do
                      not knowingly collect personal information from children
                      under 13. If you are a parent or guardian and believe your
                      child has provided us with personal information, please
                      contact us.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Changes to Policy */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Changes to This Policy</h2>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">
                      We may update this privacy policy from time to time. We
                      will notify you of any changes by posting the new privacy
                      policy on this page and updating the &quot;Last
                      updated&quot; date. You are advised to review this privacy
                      policy periodically for any changes.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Contact */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Contact Us</h2>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      If you have any questions about this privacy policy or our
                      data practices, please contact us:
                    </p>
                    <div className="space-y-2 text-muted-foreground">
                      <p>Email: privacy@casemasterpro.com</p>
                      <p>Website: casemasterpro.com</p>
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

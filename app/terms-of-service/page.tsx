import { Header } from "@/components/header";
import { Footer } from "@/components/sections/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Gavel, Users, Mail, ShieldCheck } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Gavel className="h-10 w-10 text-primary" />
                <h1 className="text-4xl font-bold tracking-tight">
                  Terms of Service
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Please read these terms carefully before using Case Master
                Pro&apos;s text processing tools.
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
                  <ShieldCheck className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Terms at a Glance
                    </h2>
                    <p className="text-muted-foreground">
                      Case Master Pro provides free, client-side text processing
                      tools. By using our service, you agree to use it
                      responsibly and understand that all processing happens
                      locally in your browser. We provide the service &quot;as
                      is&quot; without warranties.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="space-y-8">
              {/* Acceptance of Terms */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <p className="text-muted-foreground">
                      By accessing and using Case Master Pro (&quot;the
                      Service&quot;), you accept and agree to be bound by the
                      terms and provision of this agreement. If you do not agree
                      to abide by the above, please do not use this service.
                    </p>
                    <p className="text-muted-foreground">
                      These Terms of Service (&quot;Terms&quot;) govern your use
                      of our website and text processing tools. By using our
                      service, you acknowledge that you have read, understood,
                      and agree to be bound by these Terms.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Service Description */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">2. Service Description</h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        What We Provide
                      </h3>
                      <p className="text-muted-foreground">
                        Case Master Pro is a collection of free, web-based text
                        processing tools including case converters, formatters,
                        encoders/decoders, and text analysis utilities. All
                        processing is performed client-side in your browser.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Client-Side Processing
                      </h3>
                      <p className="text-muted-foreground">
                        Our tools operate entirely within your web browser using
                        JavaScript. Your text data is not transmitted to our
                        servers, ensuring privacy and security of your content.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Free Service
                      </h3>
                      <p className="text-muted-foreground">
                        The Service is provided free of charge. We reserve the
                        right to introduce premium features or paid services in
                        the future, but the core functionality will remain free.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* User Responsibilities */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">
                    3. User Responsibilities
                  </h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Acceptable Use
                      </h3>
                      <p className="text-muted-foreground">
                        You agree to use the Service only for lawful purposes
                        and in accordance with these Terms. You are responsible
                        for ensuring that your use of the Service complies with
                        all applicable laws and regulations.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Prohibited Activities
                      </h3>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>
                          Using the Service to process illegal, harmful, or
                          offensive content
                        </li>
                        <li>
                          Attempting to reverse engineer, modify, or create
                          derivative works of the Service
                        </li>
                        <li>
                          Using automated tools to access the Service in a way
                          that could damage or overload our systems
                        </li>
                        <li>Violating any applicable laws or regulations</li>
                        <li>
                          Infringing on the intellectual property rights of
                          others
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Content Ownership
                      </h3>
                      <p className="text-muted-foreground">
                        You retain full ownership of any text content you
                        process using our tools. We do not claim any rights to
                        your content and do not store or access your text data.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Intellectual Property */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">
                    4. Intellectual Property
                  </h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Our Rights</h3>
                      <p className="text-muted-foreground">
                        The Service, including its design, functionality, code,
                        and content, is owned by Case Master Pro and is
                        protected by copyright, trademark, and other
                        intellectual property laws.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        License to Use
                      </h3>
                      <p className="text-muted-foreground">
                        We grant you a limited, non-exclusive, non-transferable
                        license to use the Service for personal and commercial
                        purposes, subject to these Terms.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Restrictions
                      </h3>
                      <p className="text-muted-foreground">
                        You may not copy, modify, distribute, sell, or lease any
                        part of our Service or included software, nor may you
                        reverse engineer or attempt to extract the source code
                        of that software.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Disclaimers */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Gavel className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">5. Disclaimers</h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Service &quot;As Is&quot;
                      </h3>
                      <p className="text-muted-foreground">
                        The Service is provided on an &quot;as is&quot; and
                        &quot;as available&quot; basis. We make no
                        representations or warranties of any kind, express or
                        implied, regarding the Service&apos;s operation or
                        availability.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        No Warranty
                      </h3>
                      <p className="text-muted-foreground">
                        We disclaim all warranties, including but not limited to
                        warranties of merchantability, fitness for a particular
                        purpose, and non-infringement. We do not warrant that
                        the Service will be uninterrupted, error-free, or
                        completely secure.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Accuracy</h3>
                      <p className="text-muted-foreground">
                        While we strive to provide accurate text processing
                        tools, we cannot guarantee the accuracy, completeness,
                        or reliability of the results. Users should verify
                        important results independently.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Limitation of Liability */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">
                    6. Limitation of Liability
                  </h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        No Liability
                      </h3>
                      <p className="text-muted-foreground">
                        To the maximum extent permitted by law, Case Master Pro
                        shall not be liable for any indirect, incidental,
                        special, consequential, or punitive damages, including
                        but not limited to loss of profits, data, or use,
                        arising out of or relating to your use of the Service.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Maximum Liability
                      </h3>
                      <p className="text-muted-foreground">
                        In no event shall our total liability to you for all
                        damages exceed the amount you paid us in the twelve (12)
                        months preceding the claim. Since our Service is free,
                        this amount would be zero ($0).
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        User Responsibility
                      </h3>
                      <p className="text-muted-foreground">
                        You acknowledge that you use the Service at your own
                        risk and are responsible for any consequences resulting
                        from your use of the tools.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Privacy */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">7. Privacy</h2>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">
                      Your privacy is important to us. Our Privacy Policy
                      explains how we handle your information when you use our
                      Service. By using the Service, you agree to the collection
                      and use of information in accordance with our Privacy
                      Policy.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Governing Law */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Gavel className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">8. Governing Law</h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Jurisdiction
                      </h3>
                      <p className="text-muted-foreground">
                        These Terms shall be governed by and construed in
                        accordance with the laws of the jurisdiction where Case
                        Master Pro operates, without regard to its conflict of
                        law provisions.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Dispute Resolution
                      </h3>
                      <p className="text-muted-foreground">
                        Any disputes arising from these Terms or your use of the
                        Service shall be resolved through binding arbitration or
                        in the courts of competent jurisdiction.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Changes to Terms */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">9. Changes to Terms</h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Right to Modify
                      </h3>
                      <p className="text-muted-foreground">
                        We reserve the right to modify these Terms at any time.
                        We will notify users of any material changes by posting
                        the updated Terms on our website and updating the
                        &quot;Last updated&quot; date.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Continued Use
                      </h3>
                      <p className="text-muted-foreground">
                        Your continued use of the Service after any changes to
                        these Terms constitutes your acceptance of the new
                        Terms. If you do not agree to the modified Terms, you
                        should discontinue use of the Service.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Termination */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">10. Termination</h2>
                </div>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Your Right to Terminate
                      </h3>
                      <p className="text-muted-foreground">
                        You may stop using the Service at any time. Since no
                        account registration is required, simply discontinuing
                        use of the website constitutes termination.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Our Right to Terminate
                      </h3>
                      <p className="text-muted-foreground">
                        We may terminate or suspend access to the Service
                        immediately, without prior notice, for any reason,
                        including if you breach these Terms.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Contact Information */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">
                    11. Contact Information
                  </h2>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      If you have any questions about these Terms of Service,
                      please contact us:
                    </p>
                    <div className="space-y-2 text-muted-foreground">
                      <p>Email: legal@casemasterpro.com</p>
                      <p>Website: casemasterpro.com</p>
                    </div>
                    <p className="text-muted-foreground mt-4">
                      We will respond to your inquiries as promptly as possible.
                    </p>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

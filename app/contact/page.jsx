import { Mail, MapPin, MessageSquare } from "lucide-react";

import ToolSearch from "@/components/toolSearch";

import { toolCategories } from "@/lib/tool-categories";
import { generatePageMetadata } from "@/lib/seo-metadata";
import ContactFormComponent from "@/components/sections/ContactForm.tsx";
import Link from "next/link";
import BreadcrumbAuto from "@/components/BreadcrumbAuto";

export const metadata = generatePageMetadata({
  title: "Contact Us | Clean Formatter",
  description:
    "Get in touch with Clean Formatter for feedback, support, business inquiries, or suggestions. We're here to help you with all your text and code formatting needs.",
  keywords: [
    "contact clean formatter",
    "clean formatter support",
    "clean formatter help",
    "contact developer tools website",
    "clean formatter inquiries",
  ],
  canonical: "https://cleanformatter.com/contact",
  type: "website",
});

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      contact: "cleanformatter@gmail.com",
      color: "from-primary/50 to-primary",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbAuto pathname="/contact" />
      <ToolSearch toolCategories={toolCategories} />
      <main className="flex-1 pt-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center max-w-7xl mx-auto mb-12">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have a question, suggestion, or need help? We're here to assist
              you. Reach out through any of the methods below.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="mx-auto max-w-7xl bg-secondary/10 grid grid-cols-1 gap-8 mb-12">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className="rounded-2xl w-full mx-auto shadow-sm border p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                >
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                <p className="muted-foreground mb-3">{method.description}</p>
                <p className="text-sm font-medium">
                  <a href="mailto:cleanformatter@gmail.com">{method.contact}</a>
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactFormComponent />

            {/* Additional Info */}
            <div className="space-y-8">
              {/* FAQ Quick Links */}
              <div className=" rounded-2xl shadow-sm border p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Help</h3>
                <div className="space-y-3">
                  <Link
                    href="/faq"
                    className="block p-3 rounded-lg bg-accent dark:bg-primary/10"
                  >
                    <div className="font-medium">Help Center</div>
                    <div className="text-sm text-muted-foreground">
                      Find answers to common questions
                    </div>
                  </Link>
                  <Link
                    href="/feature-guide"
                    className="block p-3 rounded-lg bg-accent dark:bg-primary/10"
                  >
                    <div className="font-medium">Feature Guides</div>
                    <div className="text-sm text-muted-foreground">
                      Learn how to use our tools
                    </div>
                  </Link>
                </div>
              </div>

              {/* Office Info */}
              <div className="rounded-2xl border shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Our Office
                </h3>
                <div className="space-y-2 text-muted-foreground bg-accent dark:bg-primary/10 p-6 rounded-2xl">
                  <p>Kalyan, Maharashtra 421301</p>
                  <p>India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <AdUnit
        slot="8328397831"
        format="horizontal"
        closeable
        className="sticky bottom-0"
      /> */}
    </div>
  );
}

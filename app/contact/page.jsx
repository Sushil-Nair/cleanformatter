"use client";

import { useState } from "react";
import { Mail, MessageSquare, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import AdUnit from "@/components/ad-unit";
import ToolSearch from "@/components/toolSearch";
import { toolCategories } from "@/lib/tool-categories";
import Link from "next/link";

export default function ContactPage() {
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzLe1PeB4Gd9WXCZgrsm3cRZUn_PYkdNNLmLq-rmWCDTrvLmr-wBAd3nh2IxFRtKZZ5-g/exec";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      contact: "cleanformatter@gmail.com",
      color: "from-primary/50 to-primary",
    },
  ];

  const categories = [
    "General Inquiry",
    "Technical Support",
    "Feature Request",
    "Bug Report",
    "Business Partnership",
    "Privacy Concern",
    "Other",
  ];
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send data to Google Sheets via Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Important: Google Apps Script requires no-cors
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Note: With no-cors mode, we can't read the response
      // So we assume success if no error is thrown
      toast({
        title: "Success!",
        description: "Message sent successfully! We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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
            <div className="rounded-2xl shadow-sm border p-8">
              <h2 className="text-2xl font-bold tracking-tight mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Category
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Subject *
                  </label>
                  <Input
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                    placeholder="Brief description of your inquiry"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    placeholder="Please provide details about your inquiry..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/80"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

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
      <AdUnit
        slot="8328397831"
        format="horizontal"
        closeable
        className="sticky bottom-0"
      />
    </div>
  );
}

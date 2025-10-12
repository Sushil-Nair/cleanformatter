"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  description?: string;
  className?: string;
  defaultOpen?: string | string[];
}

export default function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  description,
  className = "",
}: FAQSectionProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className={`w-full py-12 ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold">{title}</h2>
          </div>
          {description && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* FAQ Accordion */}
        <Accordion
          type="single"
          collapsible
          id="FAQSection"
          className="mt-8 mx-auto w-full"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-5">
                <span className="font-semibold text-white pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 pt-2 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Optional: Add more help CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Still have questions?{" "}
            <a
              href="/contact"
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

// Variant with compact design
export function FAQSectionCompact({
  faqs,
  title = "FAQs",
  className = "",
}: {
  faqs: FAQ[];
  title?: string;
  className?: string;
}) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div id="FAQSection" className={`w-full ${className}`}>
      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">{title}</h3>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-accent"
              >
                <AccordionTrigger className="text-left hover:no-underline py-3">
                  <span className="font-medium text-sm pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm pb-3 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
        <div className="text-center p-6">
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <Link
              href="/contact"
              className="text-primary/60 hover:text-primary/70 font-medium underline"
            >
              Contact us
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

// Variant with numbered questions
export function FAQSectionNumbered({
  faqs,
  title = "Frequently Asked Questions",
  className = "",
}: {
  faqs: FAQ[];
  title?: string;
  className?: string;
}) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className={`w-full py-12 ${className}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {title}
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg px-6 bg-white"
            >
              <AccordionTrigger className="text-left hover:no-underline py-5">
                <div className="flex items-start gap-4 pr-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-5 pt-2 pl-12 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

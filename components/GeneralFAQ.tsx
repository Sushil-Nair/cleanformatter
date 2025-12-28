import Link from "next/link";
import { generalFAQs } from "@/data/generalFAQData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function GeneralFAQ() {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto">
      <Accordion type="single" collapsible className="space-y-6">
        {generalFAQs.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>

            <AccordionContent>
              <p className="mb-3 leading-relaxed">{faq.answerPlainText}</p>

              {faq.answerLinkRefs?.length > 0 && (
                <ul className="space-y-1">
                  {faq.answerLinkRefs.map((ref) => (
                    <li key={ref.href}>
                      <Link
                        href={ref.href}
                        className="text-primary underline hover:opacity-80"
                      >
                        {ref.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

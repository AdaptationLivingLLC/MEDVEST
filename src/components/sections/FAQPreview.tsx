"use client";

import { useLocale } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";
import { homeFAQs } from "@/lib/data";

export default function FAQPreview() {
  const locale = useLocale();

  const items = homeFAQs.map((faq) => ({
    question: locale === "es" ? faq.questionEs : faq.question,
    answer: locale === "es" ? faq.answerEs : faq.answer,
  }));

  return (
    <section className="py-section lg:py-section-lg bg-white">
      <div className="container-narrow">
        <SectionHeader
          title={locale === "es" ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
        />
        <AnimateIn direction="up">
          <Accordion items={items} />
        </AnimateIn>
        <div className="text-center mt-10">
          <Button href="/faq" variant="outline">
            {locale === "es" ? "Ver Todas las Preguntas" : "View All FAQs"}
          </Button>
        </div>
      </div>
    </section>
  );
}

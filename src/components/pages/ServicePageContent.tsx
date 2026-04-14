"use client";

import { useTranslations, useLocale } from "next-intl";
import type { ServicePage } from "@/lib/content";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateIn from "@/components/ui/AnimateIn";
import Card from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
import CTABand from "@/components/sections/CTABand";

type Props = {
  service: ServicePage;
};

export default function ServicePageContent({ service }: Props) {
  const locale = useLocale() as "en" | "es";
  const t = useTranslations("services");
  const isEs = locale === "es";

  const benefitIcons = ["shield", "chart", "check", "star", "heart"];

  const iconMap: Record<string, React.ReactNode> = {
    shield: (
      <svg className="w-8 h-8 text-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    chart: (
      <svg className="w-8 h-8 text-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    check: (
      <svg className="w-8 h-8 text-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    star: (
      <svg className="w-8 h-8 text-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    heart: (
      <svg className="w-8 h-8 text-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  };

  const faqItems = service.faqs.map((faq) => ({
    question: faq.question[locale],
    answer: faq.answer[locale],
  }));

  const explanationParagraphs = service.explanation[locale].split("\n\n");

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="bg-cream-100 py-16 lg:py-24">
        <div className="container-main text-center">
          <AnimateIn direction="up">
            <p className="text-xs font-semibold tracking-[3px] uppercase text-copper mb-4">
              {isEs ? "Nuestros Servicios" : "Our Services"}
            </p>
            <h1 className="font-display text-h1-mobile lg:text-h1-desktop text-brown-900 max-w-4xl mx-auto">
              {service.hero.headline[locale]}
            </h1>
            <p className="mt-6 text-brown-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              {service.hero.description[locale]}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-main">
          <SectionHeader
            label={isEs ? "Beneficios" : "Benefits"}
            title={isEs ? "Por Que Elegir Este Servicio" : "Why Choose This Service"}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.benefits.map((benefit, index) => (
              <AnimateIn key={index} delay={index * 0.1} direction="up">
                <Card className="h-full">
                  <div className="mb-4">
                    {iconMap[benefitIcons[index % benefitIcons.length]]}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-brown-900 mb-2">
                    {benefit.title[locale]}
                  </h3>
                  <p className="text-brown-400 text-sm leading-relaxed">
                    {benefit.description[locale]}
                  </p>
                </Card>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Explanation */}
      <section className="bg-cream-100 py-16 lg:py-20">
        <div className="container-main">
          <SectionHeader
            label={isEs ? "Informacion Detallada" : "Detailed Information"}
            title={isEs ? "Lo Que Necesita Saber" : "What You Need to Know"}
          />
          <div className="max-w-3xl mx-auto space-y-6">
            {explanationParagraphs.map((paragraph, index) => (
              <AnimateIn key={index} delay={index * 0.1} direction="up">
                <p className="text-brown-400 text-base lg:text-lg leading-relaxed">
                  {paragraph}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-main">
          <SectionHeader
            label={isEs ? "Nuestro Proceso" : "Our Process"}
            title={isEs ? "Como Funciona" : "How It Works"}
          />
          <div className="max-w-3xl mx-auto">
            {service.processSteps.map((step, index) => (
              <AnimateIn key={index} delay={index * 0.15} direction="left">
                <div className="flex gap-6 mb-8 last:mb-0">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-copper text-cream-100 flex items-center justify-center font-display font-bold text-lg">
                      {step.step}
                    </div>
                    {index < service.processSteps.length - 1 && (
                      <div className="w-0.5 h-full bg-cream-400 mx-auto mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-display text-xl font-semibold text-brown-900 mb-2">
                      {step.title[locale]}
                    </h3>
                    <p className="text-brown-400 leading-relaxed">
                      {step.description[locale]}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-cream-100 py-16 lg:py-20">
        <div className="container-main">
          <SectionHeader
            label={isEs ? "Preguntas Frecuentes" : "FAQ"}
            title={isEs ? "Preguntas Comunes" : "Common Questions"}
            subtitle={
              isEs
                ? "Encuentre respuestas a las preguntas mas frecuentes sobre este servicio."
                : "Find answers to the most common questions about this service."
            }
          />
          <div className="max-w-3xl mx-auto">
            <AnimateIn direction="up">
              <Accordion items={faqItems} />
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <CTABand />
    </main>
  );
}

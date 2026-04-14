"use client";

import { useTranslations, useLocale } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateIn from "@/components/ui/AnimateIn";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale();

  return (
    <section className="py-section lg:py-section-lg bg-cream-300">
      <div className="container-main">
        <SectionHeader
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
        />

        {/* Featured testimonial */}
        <AnimateIn direction="up">
          <div className="bg-white rounded-card-lg p-8 lg:p-10 max-w-3xl mx-auto mb-10 shadow-card relative">
            <span className="absolute top-4 left-6 text-6xl text-cream-500 font-display leading-none select-none">
              &ldquo;
            </span>
            <div className="flex gap-1 mb-4 text-copper text-lg">
              {"★★★★★".split("").map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <blockquote className="font-display text-brown-900 text-lg lg:text-xl leading-relaxed italic mb-6">
              {locale === "es" ? testimonials[0].quoteEs : testimonials[0].quote}
            </blockquote>
            <div>
              <p className="font-semibold text-brown-900">{testimonials[0].name}</p>
              <p className="text-sm text-brown-400">{testimonials[0].location}</p>
            </div>
          </div>
        </AnimateIn>

        {/* Grid of other testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(1, 4).map((testimonial, i) => (
            <AnimateIn key={i} delay={i * 0.1} direction="up">
              <div className="bg-white rounded-card p-6 shadow-card h-full flex flex-col">
                <div className="flex gap-0.5 mb-3 text-copper text-sm">
                  {"★★★★★".split("").map((star, j) => (
                    <span key={j}>{star}</span>
                  ))}
                </div>
                <p className="text-brown-900 leading-relaxed italic flex-1 text-sm">
                  &ldquo;{locale === "es" ? testimonial.quoteEs : testimonial.quote}&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t border-cream-400">
                  <p className="font-semibold text-sm text-brown-900">{testimonial.name}</p>
                  <p className="text-xs text-brown-400">{testimonial.location}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

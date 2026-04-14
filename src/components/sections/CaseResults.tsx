"use client";

import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateIn from "@/components/ui/AnimateIn";
import { caseResults } from "@/lib/data";

export default function CaseResults() {
  const t = useTranslations("results");

  return (
    <section className="py-section lg:py-section-lg bg-cream-100">
      <div className="container-main">
        <SectionHeader
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {caseResults.slice(0, 6).map((result, i) => (
            <AnimateIn key={i} delay={i * 0.08} direction="up">
              <div className="bg-white border border-cream-400 rounded-card p-5 flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wider text-brown-300 font-semibold">
                    {result.type}
                  </p>
                  <p className="text-sm text-brown-400 mt-1 leading-relaxed">
                    {result.description}
                  </p>
                </div>
                <p className="font-display text-2xl font-bold text-brown-900 flex-shrink-0">
                  {result.amount}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

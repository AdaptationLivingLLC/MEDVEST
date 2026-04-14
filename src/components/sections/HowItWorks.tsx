"use client";

import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateIn from "@/components/ui/AnimateIn";

const steps = [
  { key: "step1", icon: "📞" },
  { key: "step2", icon: "📋" },
  { key: "step3", icon: "✅" },
  { key: "step4", icon: "📊" },
] as const;

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section className="py-section lg:py-section-lg bg-cream-100">
      <div className="container-main">
        <SectionHeader title={t("sectionTitle")} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <AnimateIn key={step.key} delay={i * 0.1} direction="up">
              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 bg-cream-300 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="w-8 h-8 mx-auto mb-3 bg-brown-900 text-cream-100 rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <h3 className="font-display text-brown-900 font-semibold text-lg mb-2">
                  {t(`${step.key}Title`)}
                </h3>
                <p className="text-sm text-brown-400 leading-relaxed">
                  {t(`${step.key}Desc`)}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

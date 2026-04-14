"use client";

import { useTranslations } from "next-intl";
import AnimateIn from "@/components/ui/AnimateIn";

const stats = [
  { value: "$500M+", key: "administered" },
  { value: "5,000+", key: "families" },
  { value: "100%", key: "compliance" },
] as const;

export default function StatsStrip() {
  const t = useTranslations("stats");

  return (
    <section className="bg-cream-300 py-8 lg:py-10">
      <div className="container-main">
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
          {stats.map((stat, i) => (
            <AnimateIn key={stat.key} delay={i * 0.1} direction="up">
              <div className="text-center">
                <p className="font-display text-3xl lg:text-4xl font-bold text-brown-900">
                  {stat.value}
                </p>
                <p className="text-xs tracking-[2px] uppercase text-brown-400 mt-1">
                  {t(stat.key)}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

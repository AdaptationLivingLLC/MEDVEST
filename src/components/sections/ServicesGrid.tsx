"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import AnimateIn from "@/components/ui/AnimateIn";

const services = [
  { key: "msa", href: "/services/msa-administration", icon: "🛡️" },
  { key: "lien", href: "/services/lien-resolution", icon: "⚖️" },
  { key: "consulting", href: "/services/settlement-consulting", icon: "📊" },
  { key: "trust", href: "/services/trust-services", icon: "🏦" },
  { key: "liability", href: "/services/liability-settlements", icon: "📄" },
] as const;

export default function ServicesGrid() {
  const t = useTranslations("services");

  return (
    <section className="py-section lg:py-section-lg bg-white">
      <div className="container-main">
        <SectionHeader
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimateIn key={service.key} delay={i * 0.08} direction="up">
              <Link href={service.href} className="block h-full">
                <Card className="h-full group">
                  <span className="text-3xl block mb-4">{service.icon}</span>
                  <h3 className="font-display text-brown-900 font-semibold text-lg mb-2">
                    {t(`${service.key}.title`)}
                  </h3>
                  <p className="text-sm text-brown-400 leading-relaxed mb-4">
                    {t(`${service.key}.desc`)}
                  </p>
                  <span className="text-sm font-semibold text-copper group-hover:underline">
                    {t("learnMore")} →
                  </span>
                </Card>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

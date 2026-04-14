"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import AnimateIn from "@/components/ui/AnimateIn";
import SectionHeader from "@/components/ui/SectionHeader";

export default function WhoWeServe() {
  const locale = useLocale();
  const isEs = locale === "es";
  const t = useTranslations("whoWeServe");

  return (
    <section className="py-section lg:py-section-lg bg-white">
      <div className="container-main">
        <SectionHeader
          label={isEs ? "Familias Que Servimos" : "Families We Serve"}
          title={
            isEs
              ? "Protegiendo a las Familias Trabajadoras de Norteamérica"
              : "Protecting Working Families Across America"
          }
          subtitle={
            isEs
              ? "Hablamos su idioma. Entendemos su comunidad. Luchamos por su futuro."
              : "We speak your language. We understand your community. We fight for your future."
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-12 items-center">
          <AnimateIn direction="up">
            <div className="relative rounded-card-lg overflow-hidden shadow-card-hover aspect-[4/3]">
              <Image
                src="/images/family-small.jpg"
                alt={
                  isEs
                    ? "Familia sonriendo protegida por servicios de Medicare Set-Aside"
                    : "Smiling family protected by Medicare Set-Aside services"
                }
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimateIn>

          <AnimateIn direction="up" delay={0.1}>
            <div>
              <h3 className="font-display text-2xl lg:text-3xl text-brown-900 font-semibold mb-5 leading-tight">
                {isEs
                  ? "Cuando Usted o Un Ser Querido Se Lesiona en el Trabajo"
                  : "When You or a Loved One Is Injured at Work"}
              </h3>
              <p className="text-brown-400 leading-relaxed mb-4">
                {isEs
                  ? "Un accidente laboral no solo afecta su salud — afecta a toda su familia. El estrés financiero, los formularios confusos y el miedo a perder su cobertura médica futura pueden ser abrumadores."
                  : "A workplace injury doesn't just affect your health — it affects your entire family. The financial stress, the confusing paperwork, and the fear of losing future medical coverage can be overwhelming."}
              </p>
              <p className="text-brown-400 leading-relaxed mb-6">
                {isEs
                  ? "Medvst se encarga de todo el proceso de Medicare Set-Aside por usted. Protegemos su acuerdo, aseguramos su atención médica futura, y le hablamos en su idioma durante todo el proceso."
                  : "Medvst handles the entire Medicare Set-Aside process for you. We protect your settlement, secure your future medical care, and speak with you in your language through every step."}
              </p>
              <ul className="space-y-3">
                {[
                  isEs
                    ? "Servicio completamente bilingüe — Inglés y Español"
                    : "Fully bilingual service — English and Spanish",
                  isEs
                    ? "Cumplimiento 100% con CMS y Medicare"
                    : "100% CMS and Medicare compliance",
                  isEs
                    ? "Sin tarifas ocultas — cotización plana por adelantado"
                    : "No hidden fees — flat quote upfront",
                  isEs
                    ? "Trabajamos con abogados en todo el país"
                    : "We work with attorneys nationwide",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-brown-900 text-sm lg:text-base"
                  >
                    <span className="text-copper font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-16 items-center">
          <AnimateIn direction="up" className="lg:order-2">
            <div className="relative rounded-card-lg overflow-hidden shadow-card-hover aspect-[4/3]">
              <Image
                src="/images/family-group.jpg"
                alt={
                  isEs
                    ? "Familia unida con protección de acuerdo médico"
                    : "Family together with settlement protection"
                }
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimateIn>

          <AnimateIn direction="up" delay={0.1} className="lg:order-1">
            <div>
              <h3 className="font-display text-2xl lg:text-3xl text-brown-900 font-semibold mb-5 leading-tight">
                {isEs
                  ? "Su Familia Merece Protección Real"
                  : "Your Family Deserves Real Protection"}
              </h3>
              <p className="text-brown-400 leading-relaxed mb-4">
                {isEs
                  ? "Hemos administrado más de $500 millones en Medicare Set-Asides para familias trabajadoras como la suya. No importa de dónde venga o qué idioma hable — usted merece el mismo nivel de experiencia y cuidado."
                  : "We've administered over $500 million in Medicare Set-Asides for working families just like yours. No matter where you come from or what language you speak — you deserve the same level of expertise and care."}
              </p>
              <p className="text-brown-400 leading-relaxed">
                {isEs
                  ? "Cuando elige Medvst, elige un equipo que lucha por su futuro como si fuera el nuestro."
                  : "When you choose Medvst, you choose a team that fights for your future as if it were our own."}
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

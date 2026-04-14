"use client";

import { useLocale } from "next-intl";
import { aboutContent } from "@/lib/content";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateIn from "@/components/ui/AnimateIn";
import Card from "@/components/ui/Card";
import CTABand from "@/components/sections/CTABand";

export default function AboutPageContent() {
  const locale = useLocale() as "en" | "es";
  const isEs = locale === "es";

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="bg-cream-100 py-16 lg:py-24">
        <div className="container-main text-center">
          <AnimateIn direction="up">
            <p className="text-xs font-semibold tracking-[3px] uppercase text-copper mb-4">
              {isEs ? "Sobre Nosotros" : "About Us"}
            </p>
            <h1 className="font-display text-h1-mobile lg:text-h1-desktop text-brown-900 max-w-4xl mx-auto">
              {aboutContent.hero.headline[locale]}
            </h1>
            <p className="mt-6 text-brown-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              {aboutContent.hero.subheadline[locale]}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Company Story */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-main">
          <SectionHeader
            label={isEs ? "Nuestra Historia" : "Our Story"}
            title={isEs ? "Como Empezo Todo" : "How It All Started"}
          />
          <div className="max-w-3xl mx-auto space-y-6">
            {aboutContent.story[locale].map((paragraph, index) => (
              <AnimateIn key={index} delay={index * 0.1} direction="up">
                <p className="text-brown-400 text-base lg:text-lg leading-relaxed">
                  {paragraph}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-cream-100 py-16 lg:py-20">
        <div className="container-main">
          <SectionHeader
            label={isEs ? "Mision y Valores" : "Mission & Values"}
            title={isEs ? "Lo Que Nos Impulsa" : "What Drives Us"}
          />

          {/* Mission Statement */}
          <AnimateIn direction="up">
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <div className="bg-white border border-cream-400 rounded-card p-8 lg:p-10 shadow-card">
                <p className="text-xs font-semibold tracking-[3px] uppercase text-copper mb-4">
                  {isEs ? "Nuestra Mision" : "Our Mission"}
                </p>
                <p className="font-display text-xl lg:text-2xl text-brown-900 leading-relaxed italic">
                  &ldquo;{aboutContent.mission[locale]}&rdquo;
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {aboutContent.values.map((value, index) => (
              <AnimateIn key={index} delay={index * 0.1} direction="up">
                <Card className="h-full">
                  <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center mb-4">
                    <span className="text-copper font-display font-bold text-lg">
                      {value.title[locale].charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-brown-900 mb-2">
                    {value.title[locale]}
                  </h3>
                  <p className="text-brown-400 text-sm leading-relaxed">
                    {value.description[locale]}
                  </p>
                </Card>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-main">
          <SectionHeader
            label={isEs ? "Nuestro Equipo" : "Our Team"}
            title={isEs ? "Conozca a Nuestro Liderazgo" : "Meet Our Leadership"}
          />
          <div className="max-w-3xl mx-auto">
            {aboutContent.team.map((member, index) => (
              <AnimateIn key={index} delay={index * 0.1} direction="up">
                <Card className="mb-6 last:mb-0" hover={false}>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-copper/10 flex items-center justify-center">
                        <span className="text-copper font-display font-bold text-2xl">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-brown-900">
                        {member.name}
                      </h3>
                      <p className="text-copper font-semibold text-sm mb-3">
                        {member.role[locale]}
                      </p>
                      <p className="text-brown-400 text-sm leading-relaxed">
                        {member.bio[locale]}
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-cream-100 py-16 lg:py-20">
        <div className="container-main">
          <SectionHeader
            label={isEs ? "Credenciales" : "Credentials"}
            title={isEs ? "Por Que Confiar en Nosotros" : "Why Trust Us"}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutContent.credentials.map((credential, index) => (
              <AnimateIn key={index} delay={index * 0.1} direction="up">
                <Card className="h-full text-center">
                  <div className="w-12 h-12 rounded-full bg-copper/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-copper"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-display text-base font-semibold text-brown-900 mb-2">
                    {credential.title[locale]}
                  </h3>
                  <p className="text-brown-400 text-sm leading-relaxed">
                    {credential.description[locale]}
                  </p>
                </Card>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <CTABand />
    </main>
  );
}

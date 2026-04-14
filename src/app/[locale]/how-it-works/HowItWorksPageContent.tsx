"use client";

import { useLocale } from "next-intl";
import { howItWorksContent } from "@/lib/content";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateIn from "@/components/ui/AnimateIn";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CTABand from "@/components/sections/CTABand";

export default function HowItWorksPageContent() {
  const locale = useLocale() as "en" | "es";
  const isEs = locale === "es";

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="bg-cream-100 py-16 lg:py-24">
        <div className="container-main text-center">
          <AnimateIn direction="up">
            <p className="text-xs font-semibold tracking-[3px] uppercase text-copper mb-4">
              {isEs ? "El Proceso" : "The Process"}
            </p>
            <h1 className="font-display text-h1-mobile lg:text-h1-desktop text-brown-900 max-w-4xl mx-auto">
              {howItWorksContent.hero.headline[locale]}
            </h1>
            <p className="mt-6 text-brown-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              {howItWorksContent.hero.description[locale]}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* 4-Step Timeline */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-main">
          <SectionHeader
            label={isEs ? "Paso a Paso" : "Step by Step"}
            title={isEs ? "Cuatro Pasos Sencillos" : "Four Simple Steps"}
            subtitle={isEs
              ? "Desde su primera llamada hasta la administracion continua, hacemos que todo sea facil."
              : "From your first call to ongoing administration, we make everything easy."
            }
          />
          <div className="max-w-4xl mx-auto">
            {howItWorksContent.steps.map((step, index) => (
              <AnimateIn key={index} delay={index * 0.15} direction="up">
                <div className="relative flex gap-6 lg:gap-10 mb-12 last:mb-0">
                  {/* Timeline Line */}
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-copper text-cream-100 flex items-center justify-center font-display font-bold text-xl flex-shrink-0">
                      {step.step}
                    </div>
                    {index < howItWorksContent.steps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-cream-400 mt-3" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-4">
                    <h3 className="font-display text-xl lg:text-2xl font-semibold text-brown-900 mb-3">
                      {step.title[locale]}
                    </h3>
                    <p className="text-brown-400 text-base lg:text-lg leading-relaxed mb-4">
                      {step.description[locale]}
                    </p>
                    {step.details && (
                      <Card hover={false} className="bg-cream-100 border-cream-400">
                        <p className="text-brown-400 text-sm leading-relaxed">
                          {step.details[locale]}
                        </p>
                      </Card>
                    )}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="bg-cream-100 py-16 lg:py-20">
        <div className="container-main">
          <SectionHeader
            label={isEs ? "Que Esperar" : "What to Expect"}
            title={isEs ? "Su Experiencia con MED VEST" : "Your Experience with MED VEST"}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <AnimateIn delay={0} direction="up">
              <Card className="h-full text-center">
                <div className="w-12 h-12 rounded-full bg-copper/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-brown-900 mb-2">
                  {isEs ? "Respuesta Rapida" : "Quick Response"}
                </h3>
                <p className="text-brown-400 text-sm leading-relaxed">
                  {isEs
                    ? "Respondemos a todas las consultas dentro de un dia habil. Su primera consulta es siempre gratuita."
                    : "We respond to all inquiries within one business day. Your first consultation is always free."
                  }
                </p>
              </Card>
            </AnimateIn>
            <AnimateIn delay={0.1} direction="up">
              <Card className="h-full text-center">
                <div className="w-12 h-12 rounded-full bg-copper/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-brown-900 mb-2">
                  {isEs ? "Servicio Bilingue" : "Bilingual Service"}
                </h3>
                <p className="text-brown-400 text-sm leading-relaxed">
                  {isEs
                    ? "Servicio completo en ingles y espanol. Explicamos todo en terminos claros que pueda entender."
                    : "Full service in English and Spanish. We explain everything in clear terms you can understand."
                  }
                </p>
              </Card>
            </AnimateIn>
            <AnimateIn delay={0.2} direction="up">
              <Card className="h-full text-center">
                <div className="w-12 h-12 rounded-full bg-copper/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-brown-900 mb-2">
                  {isEs ? "Transparencia Total" : "Full Transparency"}
                </h3>
                <p className="text-brown-400 text-sm leading-relaxed">
                  {isEs
                    ? "Acceso 24/7 a su portal de cliente. Vea su saldo, pagos e informes en cualquier momento."
                    : "24/7 access to your client portal. View your balance, payments, and reports anytime."
                  }
                </p>
              </Card>
            </AnimateIn>
          </div>
          <AnimateIn delay={0.3} direction="up">
            <div className="text-center mt-10">
              <Button href="/contact" variant="primary" size="lg">
                {isEs ? "Comience Su Consulta Gratuita" : "Start Your Free Consultation"}
              </Button>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA Band */}
      <CTABand />
    </main>
  );
}

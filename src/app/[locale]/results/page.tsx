import type { Metadata } from "next";
import { resultsContent, businessInfo } from "@/lib/content";
import JsonLd from "@/components/seo/JsonLd";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateIn from "@/components/ui/AnimateIn";
import Card from "@/components/ui/Card";
import CTABand from "@/components/sections/CTABand";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs ? resultsContent.seo.title.es : resultsContent.seo.title.en,
    description: isEs
      ? resultsContent.seo.description.es
      : resultsContent.seo.description.en,
    alternates: {
      canonical: `/${locale}/results`,
      languages: { en: "/en/results", es: "/es/results" },
    },
    openGraph: {
      title: isEs ? resultsContent.seo.title.es : resultsContent.seo.title.en,
      description: isEs
        ? resultsContent.seo.description.es
        : resultsContent.seo.description.en,
      url: `${businessInfo.url}/${locale}/results`,
    },
  };
}

export default async function ResultsPage({ params }: Props) {
  const { locale } = await params;
  const isEs = locale === "es";
  const t = (obj: { en: string; es: string }) => (isEs ? obj.es : obj.en);

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: businessInfo.name,
    url: businessInfo.url,
    description: t(resultsContent.seo.description),
  };

  return (
    <>
      <JsonLd data={organizationLd} />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-cream-100 py-16 lg:py-24">
          <div className="container-main text-center">
            <AnimateIn direction="up">
              <p className="text-xs font-semibold tracking-[3px] uppercase text-copper mb-4">
                {isEs ? "Resultados Comprobados" : "Proven Results"}
              </p>
              <h1 className="font-display text-h1-mobile lg:text-h1-desktop text-brown-900 mb-4">
                {t(resultsContent.hero.headline)}
              </h1>
              <p className="text-brown-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                {t(resultsContent.hero.description)}
              </p>
            </AnimateIn>

            {/* Aggregate Stats */}
            <AnimateIn direction="up" delay={0.2}>
              <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {resultsContent.aggregateStats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white border border-cream-400 rounded-card p-6 shadow-card"
                  >
                    <p className="font-display text-3xl lg:text-4xl text-copper font-bold">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-brown-400 text-sm">
                      {t(stat.label)}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Trust Copy */}
        <section className="bg-white py-12 lg:py-16">
          <div className="container-main">
            <AnimateIn direction="up">
              <p className="text-brown-400 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto text-center italic">
                {t(resultsContent.trustCopy)}
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Case Results Grid */}
        <section className="bg-cream-100 py-16 lg:py-20">
          <div className="container-main">
            <SectionHeader
              label={isEs ? "Casos Representativos" : "Representative Cases"}
              title={isEs ? "Nuestros" : "Our"}
              titleAccent={isEs ? "Resultados" : "Results"}
            />

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {resultsContent.caseResults.map((result, i) => (
                <AnimateIn key={result.id} direction="up" delay={i * 0.1}>
                  <Card className="h-full">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <p className="font-display text-2xl lg:text-3xl text-copper font-bold">
                          {result.amount}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 font-display text-brown-900 font-semibold text-base">
                      {t(result.type)}
                    </p>
                    <p className="mt-2 text-brown-400 text-sm leading-relaxed">
                      {t(result.description)}
                    </p>
                  </Card>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        <CTABand />
      </main>
    </>
  );
}

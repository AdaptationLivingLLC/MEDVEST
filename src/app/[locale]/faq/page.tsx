import type { Metadata } from "next";
import { faqContent, businessInfo } from "@/lib/content";
import JsonLd from "@/components/seo/JsonLd";
import AnimateIn from "@/components/ui/AnimateIn";
import Accordion from "@/components/ui/Accordion";
import SectionHeader from "@/components/ui/SectionHeader";
import CTABand from "@/components/sections/CTABand";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs ? faqContent.seo.title.es : faqContent.seo.title.en,
    description: isEs
      ? faqContent.seo.description.es
      : faqContent.seo.description.en,
    alternates: {
      canonical: `/${locale}/faq`,
      languages: { en: "/en/faq", es: "/es/faq" },
    },
    openGraph: {
      title: isEs ? faqContent.seo.title.es : faqContent.seo.title.en,
      description: isEs
        ? faqContent.seo.description.es
        : faqContent.seo.description.en,
      url: `${businessInfo.url}/${locale}/faq`,
    },
  };
}

const categoryLabels: Record<string, { en: string; es: string }> = {
  General: { en: "General Questions", es: "Preguntas Generales" },
  MSA: {
    en: "Medicare Set-Aside (MSA)",
    es: "Medicare Set-Aside (MSA)",
  },
  Liens: {
    en: "Medicare Liens",
    es: "Gravamenes de Medicare",
  },
  Costs: {
    en: "Costs & Pricing",
    es: "Costos y Precios",
  },
  Portal: {
    en: "Client Portal",
    es: "Portal de Cliente",
  },
};

const categoryOrder = ["General", "MSA", "Liens", "Costs", "Portal"];

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  const isEs = locale === "es";
  const t = (obj: { en: string; es: string }) => (isEs ? obj.es : obj.en);

  // Group FAQs by category
  const grouped = categoryOrder.reduce<
    Record<string, { question: string; answer: string }[]>
  >((acc, cat) => {
    acc[cat] = faqContent.items
      .filter((item) => item.category === cat)
      .map((item) => ({
        question: t(item.question),
        answer: t(item.answer),
      }));
    return acc;
  }, {});

  // FAQPage structured data
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqContent.items.map((faq) => ({
      "@type": "Question",
      name: t(faq.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(faq.answer),
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqLd} />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-cream-100 py-16 lg:py-24">
          <div className="container-main text-center">
            <AnimateIn direction="up">
              <p className="text-xs font-semibold tracking-[3px] uppercase text-copper mb-4">
                {isEs ? "Centro de Ayuda" : "Help Center"}
              </p>
              <h1 className="font-display text-h1-mobile lg:text-h1-desktop text-brown-900 mb-4">
                {t(faqContent.hero.headline)}
              </h1>
              <p className="text-brown-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                {t(faqContent.hero.description)}
              </p>
            </AnimateIn>

            {/* Category Jump Links */}
            <AnimateIn direction="up" delay={0.2}>
              <nav
                className="mt-8 flex flex-wrap justify-center gap-3"
                aria-label={isEs ? "Categorias de preguntas" : "Question categories"}
              >
                {categoryOrder.map((cat) => (
                  <a
                    key={cat}
                    href={`#${cat.toLowerCase()}`}
                    className="inline-flex items-center px-4 py-2 bg-white border border-cream-400 rounded-button text-sm font-semibold text-brown-900 hover:bg-brown-900 hover:text-cream-100 transition-all duration-200"
                  >
                    {t(categoryLabels[cat])}
                  </a>
                ))}
              </nav>
            </AnimateIn>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container-main max-w-3xl">
            {categoryOrder.map((cat, catIndex) => (
              <div key={cat} id={cat.toLowerCase()} className={catIndex > 0 ? "mt-16" : ""}>
                <AnimateIn direction="up">
                  <SectionHeader
                    title={t(categoryLabels[cat])}
                    centered={false}
                  />
                  <Accordion items={grouped[cat]} />
                </AnimateIn>
              </div>
            ))}
          </div>
        </section>

        <CTABand />
      </main>
    </>
  );
}

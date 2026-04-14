import type { Metadata } from "next";
import { servicePages } from "@/lib/content";
import JsonLd from "@/components/seo/JsonLd";
import ServicePageContent from "@/components/pages/ServicePageContent";

const service = servicePages.find((s) => s.slug === "lien-resolution")!;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale === "es" ? "es" : "en";

  return {
    title: service.seo.title[lang],
    description: service.seo.description[lang],
    alternates: {
      canonical: `/${locale}/services/lien-resolution`,
      languages: { en: "/en/services/lien-resolution", es: "/es/services/lien-resolution" },
    },
    openGraph: {
      title: service.seo.title[lang],
      description: service.seo.description[lang],
      url: `https://medvst.com/${locale}/services/lien-resolution`,
      images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function LienResolutionPage({ params }: Props) {
  const { locale } = await params;
  const isEs = locale === "es";
  const lang = isEs ? "es" : "en";

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.hero.headline[lang],
    description: service.seo.description[lang],
    provider: {
      "@type": "Organization",
      name: "MED VEST",
      url: "https://medvst.com",
    },
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: "Medicare Lien Resolution",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question[lang],
      acceptedAnswer: { "@type": "Answer", text: faq.answer[lang] },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEs ? "Inicio" : "Home", item: `https://medvst.com/${locale}` },
      { "@type": "ListItem", position: 2, name: isEs ? "Servicios" : "Services", item: `https://medvst.com/${locale}/services` },
      { "@type": "ListItem", position: 3, name: service.hero.headline[lang], item: `https://medvst.com/${locale}/services/lien-resolution` },
    ],
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />
      <ServicePageContent service={service} />
    </>
  );
}

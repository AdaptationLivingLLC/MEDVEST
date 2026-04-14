import type { Metadata } from "next";
import { howItWorksContent } from "@/lib/content";
import JsonLd from "@/components/seo/JsonLd";
import HowItWorksPageContent from "./HowItWorksPageContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  const lang = isEs ? "es" : "en";

  return {
    title: howItWorksContent.seo.title[lang],
    description: howItWorksContent.seo.description[lang],
    alternates: {
      canonical: `/${locale}/how-it-works`,
      languages: { en: "/en/how-it-works", es: "/es/how-it-works" },
    },
    openGraph: {
      title: howItWorksContent.seo.title[lang],
      description: howItWorksContent.seo.description[lang],
      url: `https://medvst.com/${locale}/how-it-works`,
      images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function HowItWorksPage({ params }: Props) {
  const { locale } = await params;
  const isEs = locale === "es";
  const lang = isEs ? "es" : "en";

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isEs
      ? "Como funciona la administracion de Medicare Set-Aside con Medvst"
      : "How Medicare Set-Aside Administration Works with Medvst",
    description: howItWorksContent.seo.description[lang],
    step: howItWorksContent.steps.map((s) => ({
      "@type": "HowToStep",
      position: s.step,
      name: s.title[lang],
      text: s.description[lang],
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEs ? "Inicio" : "Home", item: `https://medvst.com/${locale}` },
      { "@type": "ListItem", position: 2, name: isEs ? "Como Funciona" : "How It Works", item: `https://medvst.com/${locale}/how-it-works` },
    ],
  };

  return (
    <>
      <JsonLd data={howToLd} />
      <JsonLd data={breadcrumbLd} />
      <HowItWorksPageContent />
    </>
  );
}

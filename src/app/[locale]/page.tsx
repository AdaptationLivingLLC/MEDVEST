import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import StatsStrip from "@/components/sections/StatsStrip";
import HowItWorks from "@/components/sections/HowItWorks";
import ServicesGrid from "@/components/sections/ServicesGrid";
import CaseResults from "@/components/sections/CaseResults";
import Testimonials from "@/components/sections/Testimonials";
import FAQPreview from "@/components/sections/FAQPreview";
import CTABand from "@/components/sections/CTABand";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";
import JsonLd from "@/components/seo/JsonLd";
import { homeFAQs } from "@/lib/data";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs
      ? "MED VEST | Expertos en Medicare Set-Aside — Administración, Gravámenes y Consultoría"
      : "MED VEST | Medicare Set-Aside Experts — Administration, Liens & Consulting",
    description: isEs
      ? "Administración experta de Medicare Set-Aside para familias en todo el país. Más de $500M administrados. 100% cumplimiento CMS. Consulta gratuita."
      : "Expert Medicare Set-Aside administration for families nationwide. $500M+ administered. 100% CMS compliance. Free consultation.",
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", es: "/es" },
    },
    openGraph: {
      title: "MED VEST | Medicare Set-Aside Experts",
      description:
        "Expert MSA administration, lien resolution, and settlement consulting. Protecting families nationwide.",
      url: `https://medvst.com/${locale}`,
      images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const isEs = locale === "es";

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MED VEST",
    url: "https://medvst.com",
    logo: "https://medvst.com/images/logo.png",
    description:
      "Expert Medicare Set-Aside administration, lien resolution, and settlement consulting for families nationwide.",
    email: "info@medvst.com",
    telephone: "+18186741211",
    address: {
      "@type": "PostalAddress",
      streetAddress: "PO Box 8294",
      addressLocality: "Van Nuys",
      addressRegion: "CA",
      postalCode: "91410",
      addressCountry: "US",
    },
    areaServed: { "@type": "Country", name: "United States" },
  };

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MED VEST",
    image: "https://medvst.com/images/logo.png",
    url: "https://medvst.com",
    telephone: "+18186741211",
    email: "info@medvst.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "PO Box 8294",
      addressLocality: "Van Nuys",
      addressRegion: "CA",
      postalCode: "91410",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 34.187, longitude: -118.449 },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    priceRange: "$$",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFAQs.map((faq) => ({
      "@type": "Question",
      name: isEs ? faq.questionEs : faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: isEs ? faq.answerEs : faq.answer,
      },
    })),
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MED VEST",
    url: "https://medvst.com",
    inLanguage: [isEs ? "es" : "en"],
  };

  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={localBusinessLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={websiteLd} />

      <main id="main-content">
        <Hero />
        <StatsStrip />
        <HowItWorks />
        <ServicesGrid />
        <CaseResults />
        <Testimonials />
        <FAQPreview />
        <CTABand />
      </main>

      <StickyMobileCTA />
    </>
  );
}

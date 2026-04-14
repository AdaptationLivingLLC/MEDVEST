import type { Metadata } from "next";
import { aboutContent, businessInfo } from "@/lib/content";
import JsonLd from "@/components/seo/JsonLd";
import AboutPageContent from "./AboutPageContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: aboutContent.seo.title[isEs ? "es" : "en"],
    description: aboutContent.seo.description[isEs ? "es" : "en"],
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: "/en/about", es: "/es/about" },
    },
    openGraph: {
      title: aboutContent.seo.title[isEs ? "es" : "en"],
      description: aboutContent.seo.description[isEs ? "es" : "en"],
      url: `https://medvst.com/${locale}/about`,
      images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const isEs = locale === "es";

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: businessInfo.name,
    url: businessInfo.url,
    logo: `${businessInfo.url}/images/logo.png`,
    description: aboutContent.seo.description[isEs ? "es" : "en"],
    email: businessInfo.email,
    telephone: businessInfo.phoneRaw,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.address.street,
      addressLocality: businessInfo.address.city,
      addressRegion: businessInfo.address.state,
      postalCode: businessInfo.address.zip,
      addressCountry: "US",
    },
    areaServed: { "@type": "Country", name: "United States" },
    founder: {
      "@type": "Person",
      name: aboutContent.team[0].name,
      jobTitle: aboutContent.team[0].role[isEs ? "es" : "en"],
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isEs ? "Inicio" : "Home",
        item: `https://medvst.com/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isEs ? "Sobre Nosotros" : "About",
        item: `https://medvst.com/${locale}/about`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={breadcrumbLd} />
      <AboutPageContent />
    </>
  );
}

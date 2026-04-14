import type { Metadata } from "next";
import { portalContent, businessInfo } from "@/lib/content";
import JsonLd from "@/components/seo/JsonLd";
import AnimateIn from "@/components/ui/AnimateIn";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import CTABand from "@/components/sections/CTABand";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs ? portalContent.seo.title.es : portalContent.seo.title.en,
    description: isEs
      ? portalContent.seo.description.es
      : portalContent.seo.description.en,
    alternates: {
      canonical: `/${locale}/portal`,
      languages: { en: "/en/portal", es: "/es/portal" },
    },
    openGraph: {
      title: isEs ? portalContent.seo.title.es : portalContent.seo.title.en,
      description: isEs
        ? portalContent.seo.description.es
        : portalContent.seo.description.en,
      url: `${businessInfo.url}/${locale}/portal`,
    },
  };
}

const featureIcons = [
  // Balance tracking
  "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  // Payment history
  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  // Document downloads
  "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  // Secure upload
  "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
  // Messaging
  "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  // Mobile access
  "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
];

export default async function PortalPage({ params }: Props) {
  const { locale } = await params;
  const isEs = locale === "es";
  const t = (obj: { en: string; es: string }) => (isEs ? obj.es : obj.en);

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isEs ? portalContent.seo.title.es : portalContent.seo.title.en,
    description: isEs
      ? portalContent.seo.description.es
      : portalContent.seo.description.en,
    url: `${businessInfo.url}/${locale}/portal`,
    publisher: {
      "@type": "Organization",
      name: businessInfo.name,
      url: businessInfo.url,
    },
  };

  return (
    <>
      <JsonLd data={webPageLd} />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-cream-100 py-16 lg:py-24">
          <div className="container-main text-center">
            <AnimateIn direction="up">
              <p className="text-xs font-semibold tracking-[3px] uppercase text-copper mb-4">
                {isEs ? "Portal de Cliente" : "Client Portal"}
              </p>
              <h1 className="font-display text-h1-mobile lg:text-h1-desktop text-brown-900 mb-4">
                {t(portalContent.hero.headline)}
              </h1>
              <p className="text-brown-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                {t(portalContent.hero.description)}
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container-main">
            <SectionHeader
              label={isEs ? "Funcionalidades" : "Features"}
              title={isEs ? "Todo Lo Que Necesita," : "Everything You Need,"}
              titleAccent={isEs ? "En Un Solo Lugar" : "In One Place"}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {portalContent.features.map((feature, i) => (
                <AnimateIn key={i} direction="up" delay={i * 0.1}>
                  <Card className="h-full">
                    <div className="w-12 h-12 bg-copper/10 rounded-full flex items-center justify-center mb-4">
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
                          d={featureIcons[i] || featureIcons[0]}
                        />
                      </svg>
                    </div>
                    <h3 className="font-display text-brown-900 font-semibold text-lg mb-2">
                      {t(feature.title)}
                    </h3>
                    <p className="text-brown-400 text-sm leading-relaxed">
                      {t(feature.description)}
                    </p>
                  </Card>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Login Placeholder */}
        <section className="bg-cream-100 py-16 lg:py-20">
          <div className="container-main">
            <AnimateIn direction="up">
              <div className="max-w-lg mx-auto text-center">
                <div className="bg-white border border-cream-400 rounded-card p-8 lg:p-12 shadow-card">
                  <div className="w-16 h-16 bg-copper/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8 text-copper"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h2 className="font-display text-brown-900 text-xl lg:text-2xl font-semibold mb-3">
                    {isEs ? "Acceder al Portal" : "Access Your Portal"}
                  </h2>
                  <p className="text-brown-400 leading-relaxed mb-6">
                    {isEs
                      ? "Inicie sesión para ver el estado de su caso, subir documentos y comunicarse con nuestro equipo."
                      : "Log in to view your case status, upload documents, and communicate with our team."}
                  </p>
                  <Button href="https://ABxgFApScndDJpUIDcl9.app.clientclub.net/" variant="primary" size="lg" external>
                    {isEs ? "Iniciar Sesión en el Portal" : "Log In to Portal"}
                  </Button>
                </div>

                <p className="mt-6 text-brown-400 text-sm">
                  {t(portalContent.loginCta)}
                </p>
                <p className="mt-3 text-brown-400 text-sm">
                  {t(portalContent.signupCta)}
                </p>
              </div>
            </AnimateIn>
          </div>
        </section>

        <CTABand />
      </main>
    </>
  );
}

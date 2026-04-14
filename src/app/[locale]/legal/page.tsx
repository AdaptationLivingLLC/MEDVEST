import type { Metadata } from "next";
import { legalContent, businessInfo } from "@/lib/content";
import JsonLd from "@/components/seo/JsonLd";
import AnimateIn from "@/components/ui/AnimateIn";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs ? legalContent.seo.title.es : legalContent.seo.title.en,
    description: isEs
      ? legalContent.seo.description.es
      : legalContent.seo.description.en,
    alternates: {
      canonical: `/${locale}/legal`,
      languages: { en: "/en/legal", es: "/es/legal" },
    },
    openGraph: {
      title: isEs ? legalContent.seo.title.es : legalContent.seo.title.en,
      description: isEs
        ? legalContent.seo.description.es
        : legalContent.seo.description.en,
      url: `${businessInfo.url}/${locale}/legal`,
    },
  };
}

export default async function LegalPage({ params }: Props) {
  const { locale } = await params;
  const isEs = locale === "es";
  const t = (obj: { en: string; es: string }) => (isEs ? obj.es : obj.en);

  const legalSections = [
    {
      key: "privacy" as const,
      anchor: "privacy-policy",
      title: t(legalContent.privacyPolicy.title),
      lastUpdated: legalContent.privacyPolicy.lastUpdated,
      content: t(legalContent.privacyPolicy.content),
    },
    {
      key: "terms" as const,
      anchor: "terms-of-service",
      title: t(legalContent.termsOfService.title),
      lastUpdated: legalContent.termsOfService.lastUpdated,
      content: t(legalContent.termsOfService.content),
    },
    {
      key: "hipaa" as const,
      anchor: "hipaa-notice",
      title: t(legalContent.hipaaNotice.title),
      lastUpdated: legalContent.hipaaNotice.lastUpdated,
      content: t(legalContent.hipaaNotice.content),
    },
    {
      key: "accessibility" as const,
      anchor: "accessibility",
      title: t(legalContent.accessibilityStatement.title),
      lastUpdated: legalContent.accessibilityStatement.lastUpdated,
      content: t(legalContent.accessibilityStatement.content),
    },
  ];

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isEs ? legalContent.seo.title.es : legalContent.seo.title.en,
    description: isEs
      ? legalContent.seo.description.es
      : legalContent.seo.description.en,
    url: `${businessInfo.url}/${locale}/legal`,
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
                {isEs ? "Informacion Legal" : "Legal Information"}
              </p>
              <h1 className="font-display text-h1-mobile lg:text-h1-desktop text-brown-900 mb-4">
                {isEs ? "Avisos Legales" : "Legal Notices"}
              </h1>
              <p className="text-brown-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                {isEs
                  ? "Transparencia y proteccion de su informacion son nuestras prioridades."
                  : "Transparency and protection of your information are our priorities."}
              </p>
            </AnimateIn>

            {/* Section Navigation */}
            <AnimateIn direction="up" delay={0.2}>
              <nav
                className="mt-8 flex flex-wrap justify-center gap-3"
                aria-label={isEs ? "Secciones legales" : "Legal sections"}
              >
                {legalSections.map((section) => (
                  <a
                    key={section.anchor}
                    href={`#${section.anchor}`}
                    className="inline-flex items-center px-4 py-2 bg-white border border-cream-400 rounded-button text-sm font-semibold text-brown-900 hover:bg-brown-900 hover:text-cream-100 transition-all duration-200"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </AnimateIn>
          </div>
        </section>

        {/* Legal Content Sections */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container-main max-w-3xl">
            {legalSections.map((section, i) => (
              <div
                key={section.anchor}
                id={section.anchor}
                className={i > 0 ? "mt-16 pt-16 border-t border-cream-400" : ""}
              >
                <AnimateIn direction="up">
                  <h2 className="font-display text-h2-mobile lg:text-h2-desktop text-brown-900 mb-2">
                    {section.title}
                  </h2>
                  <p className="text-brown-300 text-sm mb-8">
                    {isEs ? "Ultima actualizacion:" : "Last updated:"}{" "}
                    {section.lastUpdated}
                  </p>
                  <div className="prose prose-brown max-w-none">
                    {section.content.split("\n\n").map((paragraph, j) => {
                      // Check if paragraph looks like a heading (ALL CAPS)
                      if (
                        paragraph === paragraph.toUpperCase() &&
                        paragraph.length < 100 &&
                        !paragraph.startsWith("-")
                      ) {
                        return (
                          <h3
                            key={j}
                            className="font-display text-brown-900 font-semibold text-lg mt-8 mb-3"
                          >
                            {paragraph}
                          </h3>
                        );
                      }

                      // Check if paragraph is a list
                      if (paragraph.startsWith("- ")) {
                        return (
                          <ul key={j} className="list-disc pl-5 space-y-1 mb-4">
                            {paragraph.split("\n").map((item, k) => (
                              <li
                                key={k}
                                className="text-brown-400 text-sm leading-relaxed"
                              >
                                {item.replace(/^- /, "")}
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      return (
                        <p
                          key={j}
                          className="text-brown-400 text-sm leading-relaxed mb-4"
                        >
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </AnimateIn>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

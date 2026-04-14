import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { blogArticles } from "@/lib/blog-content";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimateIn from "@/components/ui/AnimateIn";
import Card from "@/components/ui/Card";
import CTABand from "@/components/sections/CTABand";
import JsonLd from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs
      ? "Recursos y Articulos | MED VEST"
      : "Resources & Articles | MED VEST",
    description: isEs
      ? "Articulos informativos sobre Medicare Set-Aside, administracion de MSA, resolución de gravamenes y mas. Recursos gratuitos de MED VEST."
      : "Informative articles about Medicare Set-Aside, MSA administration, lien resolution, and more. Free resources from MED VEST.",
    alternates: {
      canonical: `/${locale}/resources`,
      languages: { en: "/en/resources", es: "/es/resources" },
    },
    openGraph: {
      title: isEs
        ? "Recursos y Articulos | MED VEST"
        : "Resources & Articles | MED VEST",
      description: isEs
        ? "Articulos informativos sobre Medicare Set-Aside y administracion de MSA."
        : "Informative articles about Medicare Set-Aside and MSA administration.",
      url: `https://medvst.com/${locale}/resources`,
    },
  };
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  const isEs = locale === "es";

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
        name: isEs ? "Recursos" : "Resources",
        item: `https://medvst.com/${locale}/resources`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />

      <main id="main-content">
        {/* Hero Section */}
        <section className="bg-cream-100 pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="container-main">
            <SectionHeader
              label={isEs ? "Recursos" : "Resources"}
              title={isEs ? "Articulos y" : "Articles &"}
              titleAccent={isEs ? "Recursos" : "Resources"}
              subtitle={
                isEs
                  ? "Informacion clara y util sobre Medicare Set-Aside, administracion de MSA y proteccion de acuerdos. Escrito para personas reales, no abogados."
                  : "Clear, helpful information about Medicare Set-Aside, MSA administration, and settlement protection. Written for real people, not lawyers."
              }
            />
          </div>
        </section>

        {/* Articles Grid */}
        <section className="bg-cream-200 py-16 lg:py-24">
          <div className="container-main">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogArticles.map((article, index) => (
                <AnimateIn key={article.slug} delay={index * 0.1}>
                  <Link href={`/resources/${article.slug}`}>
                    <Card className="h-full flex flex-col">
                      {/* Category & Reading Time */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold tracking-[2px] uppercase text-copper">
                          {article.category}
                        </span>
                        <span className="text-xs text-brown-400">
                          {article.readingTime} {isEs ? "min lectura" : "min read"}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-lg lg:text-xl text-brown-900 mb-3 leading-snug">
                        {isEs ? article.titleEs : article.title}
                      </h3>

                      {/* Description */}
                      <p className="text-brown-400 text-sm leading-relaxed mb-4 flex-grow">
                        {isEs ? article.descriptionEs : article.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-cream-400">
                        <time
                          dateTime={article.publishDate}
                          className="text-xs text-brown-300"
                        >
                          {new Date(article.publishDate).toLocaleDateString(
                            isEs ? "es-US" : "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </time>
                        <span className="text-copper font-semibold text-sm">
                          {isEs ? "Leer mas" : "Read more"} &rarr;
                        </span>
                      </div>
                    </Card>
                  </Link>
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

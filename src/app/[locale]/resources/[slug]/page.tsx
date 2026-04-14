import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  getArticleBySlug,
  getAllArticleSlugs,
} from "@/lib/blog-content";
import { routing } from "@/i18n/routing";
import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";
import CTABand from "@/components/sections/CTABand";
import JsonLd from "@/components/seo/JsonLd";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const isEs = locale === "es";
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  const title = isEs ? article.titleEs : article.title;
  const description = isEs ? article.descriptionEs : article.description;

  return {
    title: `${title} | Medvst`,
    description,
    alternates: {
      canonical: `/${locale}/resources/${slug}`,
      languages: {
        en: `/en/resources/${slug}`,
        es: `/es/resources/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | Medvst`,
      description,
      url: `https://medvst.com/${locale}/resources/${slug}`,
      type: "article",
      publishedTime: article.publishDate,
      authors: [article.author],
    },
  };
}

/**
 * Render article content string into paragraphs.
 * Lines starting with ## become h2 headings.
 * Lines starting with **number.** become ordered-list style items.
 * Lines starting with - become list items.
 * Everything else is a paragraph.
 */
function renderContent(content: string) {
  const blocks = content.split("\n\n");

  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Heading (## ...)
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="font-display text-xl lg:text-2xl text-brown-900 mt-10 mb-4"
        >
          {trimmed.replace("## ", "")}
        </h2>
      );
    }

    // Check if block is a list (lines start with - )
    const lines = trimmed.split("\n");
    const isList = lines.every((l) => l.trim().startsWith("- "));
    if (isList) {
      return (
        <ul key={i} className="list-disc list-inside space-y-2 my-4 text-brown-600 leading-relaxed">
          {lines.map((line, j) => (
            <li key={j}>{renderInlineFormatting(line.trim().replace(/^- /, ""))}</li>
          ))}
        </ul>
      );
    }

    // Check if block is numbered list (lines start with number.)
    const isNumberedList = lines.every((l) => /^\d+\.\s/.test(l.trim()));
    if (isNumberedList) {
      return (
        <ol key={i} className="list-decimal list-inside space-y-2 my-4 text-brown-600 leading-relaxed">
          {lines.map((line, j) => (
            <li key={j}>{renderInlineFormatting(line.trim().replace(/^\d+\.\s/, ""))}</li>
          ))}
        </ol>
      );
    }

    // Regular paragraph
    return (
      <p key={i} className="text-brown-600 leading-relaxed mb-4">
        {renderInlineFormatting(trimmed)}
      </p>
    );
  });
}

/** Handle **bold** inline formatting */
function renderInlineFormatting(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-brown-800">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const isEs = locale === "es";
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const title = isEs ? article.titleEs : article.title;
  const description = isEs ? article.descriptionEs : article.description;
  const content = isEs ? article.contentEs : article.content;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: article.publishDate,
    author: {
      "@type": "Organization",
      name: article.author,
      url: "https://medvst.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Medvst",
      url: "https://medvst.com",
      logo: {
        "@type": "ImageObject",
        url: "https://medvst.com/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://medvst.com/${locale}/resources/${slug}`,
    },
    inLanguage: isEs ? "es" : "en",
    articleSection: article.category,
    wordCount: content.split(/\s+/).length,
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
        name: isEs ? "Recursos" : "Resources",
        item: `https://medvst.com/${locale}/resources`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://medvst.com/${locale}/resources/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />

      <main id="main-content">
        {/* Article Header */}
        <section className="bg-cream-100 pt-32 pb-12 lg:pt-40 lg:pb-16">
          <div className="container-main max-w-3xl mx-auto">
            <AnimateIn direction="up">
              {/* Back link */}
              <Link
                href="/resources"
                className="inline-flex items-center text-copper font-semibold text-sm mb-8 hover:text-copper-dark transition-colors"
              >
                &larr; {isEs ? "Volver a Recursos" : "Back to Resources"}
              </Link>

              {/* Category & Reading Time */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-semibold tracking-[2px] uppercase text-copper">
                  {article.category}
                </span>
                <span className="text-xs text-brown-400">
                  {article.readingTime} {isEs ? "min lectura" : "min read"}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-h2-mobile lg:text-h2-desktop text-brown-900 mb-4">
                {title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-brown-400">
                <span>{article.author}</span>
                <span>&middot;</span>
                <time dateTime={article.publishDate}>
                  {new Date(article.publishDate).toLocaleDateString(
                    isEs ? "es-US" : "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </time>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Article Content */}
        <section className="bg-cream-200 py-12 lg:py-20">
          <div className="container-main max-w-3xl mx-auto">
            <AnimateIn direction="up" delay={0.1}>
              <article className="prose-custom">
                {renderContent(content)}
              </article>
            </AnimateIn>

            {/* Bottom CTA */}
            <AnimateIn direction="up" delay={0.2}>
              <div className="mt-16 p-8 bg-white border border-cream-400 rounded-card text-center">
                <h3 className="font-display text-xl lg:text-2xl text-brown-900 mb-3">
                  {isEs
                    ? "Necesita Ayuda con Su Medicare Set-Aside?"
                    : "Need Help with Your Medicare Set-Aside?"}
                </h3>
                <p className="text-brown-400 mb-6 max-w-lg mx-auto">
                  {isEs
                    ? "Nuestro equipo esta listo para ayudarle. Contactenos para una consulta gratuita."
                    : "Our team is ready to help. Contact us for a free consultation."}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button href="/contact" variant="primary" size="lg">
                    {isEs ? "Consulta Gratuita" : "Free Consultation"}
                  </Button>
                  <Button
                    href="tel:+18186741211"
                    variant="outline"
                    size="lg"
                    external
                  >
                    (818) 674-1211
                  </Button>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <CTABand />
      </main>
    </>
  );
}

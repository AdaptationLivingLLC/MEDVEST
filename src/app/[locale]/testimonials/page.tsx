import type { Metadata } from "next";
import { testimonials } from "@/lib/data";
import { businessInfo } from "@/lib/content";
import JsonLd from "@/components/seo/JsonLd";
import AnimateIn from "@/components/ui/AnimateIn";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import CTABand from "@/components/sections/CTABand";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs
      ? "Testimonios | MED VEST"
      : "Testimonials | MED VEST",
    description: isEs
      ? "Lea lo que nuestros clientes dicen sobre MED VEST. Mas de 5,000 familias atendidas con calificacion de 5 estrellas."
      : "Read what our clients say about MED VEST. Over 5,000 families served with 5-star ratings.",
    alternates: {
      canonical: `/${locale}/testimonials`,
      languages: { en: "/en/testimonials", es: "/es/testimonials" },
    },
    openGraph: {
      title: isEs ? "Testimonios | MED VEST" : "Testimonials | MED VEST",
      description: isEs
        ? "Lea lo que nuestros clientes dicen sobre MED VEST."
        : "Read what our clients say about MED VEST.",
      url: `${businessInfo.url}/${locale}/testimonials`,
    },
  };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-copper" : "text-cream-400"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default async function TestimonialsPage({ params }: Props) {
  const { locale } = await params;
  const isEs = locale === "es";

  const avgRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  const aggregateRatingLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessInfo.name,
    url: businessInfo.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      bestRating: "5",
      worstRating: "1",
      ratingCount: testimonials.length.toString(),
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating.toString(),
        bestRating: "5",
      },
      reviewBody: isEs ? t.quoteEs : t.quote,
    })),
  };

  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <>
      <JsonLd data={aggregateRatingLd} />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-cream-100 py-16 lg:py-24">
          <div className="container-main text-center">
            <AnimateIn direction="up">
              <p className="text-xs font-semibold tracking-[3px] uppercase text-copper mb-4">
                {isEs ? "Testimonios de Clientes" : "Client Testimonials"}
              </p>
              <h1 className="font-display text-h1-mobile lg:text-h1-desktop text-brown-900 mb-4">
                {isEs
                  ? "Lo Que Dicen Nuestros Clientes"
                  : "What Our Clients Say"}
              </h1>
              <p className="text-brown-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                {isEs
                  ? "Cada testimonio representa una familia que confiamos en nosotros para proteger su acuerdo y su futuro."
                  : "Every testimonial represents a family who trusted us to protect their settlement and their future."}
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Featured Testimonial */}
        <section className="bg-brown-900 py-16 lg:py-20">
          <div className="container-main">
            <AnimateIn direction="up">
              <div className="max-w-3xl mx-auto text-center">
                <StarRating rating={featured.rating} />
                <blockquote className="mt-6">
                  <p className="font-display text-xl lg:text-2xl text-cream-100 leading-relaxed italic">
                    &ldquo;{isEs ? featured.quoteEs : featured.quote}&rdquo;
                  </p>
                </blockquote>
                <div className="mt-6">
                  <p className="text-copper font-semibold text-lg">
                    {featured.name}
                  </p>
                  <p className="text-cream-500 text-sm">{featured.location}</p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="bg-cream-100 py-16 lg:py-20">
          <div className="container-main">
            <SectionHeader
              label={isEs ? "Mas Testimonios" : "More Testimonials"}
              title={isEs ? "Historias de" : "Stories of"}
              titleAccent={isEs ? "Confianza" : "Trust"}
            />

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {rest.map((testimonial, i) => (
                <AnimateIn key={i} direction="up" delay={i * 0.1}>
                  <Card className="h-full flex flex-col">
                    <StarRating rating={testimonial.rating} />
                    <blockquote className="mt-4 flex-1">
                      <p className="text-brown-400 leading-relaxed italic">
                        &ldquo;
                        {isEs ? testimonial.quoteEs : testimonial.quote}
                        &rdquo;
                      </p>
                    </blockquote>
                    <div className="mt-4 pt-4 border-t border-cream-400">
                      <p className="font-semibold text-brown-900">
                        {testimonial.name}
                      </p>
                      <p className="text-brown-400 text-sm">
                        {testimonial.location}
                      </p>
                    </div>
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

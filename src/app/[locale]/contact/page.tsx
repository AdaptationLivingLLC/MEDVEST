import type { Metadata } from "next";
import { contactContent, businessInfo } from "@/lib/content";
import JsonLd from "@/components/seo/JsonLd";
import AnimateIn from "@/components/ui/AnimateIn";
import Card from "@/components/ui/Card";
import CTABand from "@/components/sections/CTABand";
import ContactForm from "@/components/forms/ContactForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: isEs ? contactContent.seo.title.es : contactContent.seo.title.en,
    description: isEs
      ? contactContent.seo.description.es
      : contactContent.seo.description.en,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { en: "/en/contact", es: "/es/contact" },
    },
    openGraph: {
      title: isEs ? contactContent.seo.title.es : contactContent.seo.title.en,
      description: isEs
        ? contactContent.seo.description.es
        : contactContent.seo.description.en,
      url: `${businessInfo.url}/${locale}/contact`,
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const isEs = locale === "es";
  const t = (obj: { en: string; es: string }) => (isEs ? obj.es : obj.en);

  const contactPageLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: isEs ? "Contactenos - Medvst" : "Contact Us - Medvst",
    url: `${businessInfo.url}/${locale}/contact`,
    mainEntity: {
      "@type": "LocalBusiness",
      name: businessInfo.name,
      telephone: businessInfo.phoneRaw,
      email: businessInfo.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: businessInfo.address.street,
        addressLocality: businessInfo.address.city,
        addressRegion: businessInfo.address.state,
        postalCode: businessInfo.address.zip,
        addressCountry: "US",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    },
  };

  return (
    <>
      <JsonLd data={contactPageLd} />

      <main id="main-content">
        {/* Hero */}
        <section className="bg-cream-100 py-16 lg:py-24">
          <div className="container-main text-center">
            <AnimateIn direction="up">
              <p className="text-xs font-semibold tracking-[3px] uppercase text-copper mb-4">
                {isEs ? "Contacto" : "Contact"}
              </p>
              <h1 className="font-display text-h1-mobile lg:text-h1-desktop text-brown-900 mb-4">
                {t(contactContent.hero.headline)}
              </h1>
              <p className="text-brown-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                {t(contactContent.hero.description)}
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Form + Info */}
        <section className="bg-white py-16 lg:py-20">
          <div className="container-main">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <AnimateIn direction="up">
                  <p className="text-brown-400 leading-relaxed mb-8">
                    {t(contactContent.formIntro)}
                  </p>
                  <ContactForm />
                </AnimateIn>
              </div>

              {/* Business Info Sidebar */}
              <div className="lg:col-span-2">
                <AnimateIn direction="up" delay={0.2}>
                  <div className="space-y-6">
                    {/* Hablamos Espanol Badge */}
                    <div className="bg-copper/10 border border-copper/30 rounded-card p-4 text-center">
                      <p className="font-display text-copper font-bold text-lg">
                        {t(contactContent.spanishBadge)}
                      </p>
                    </div>

                    {/* Contact Details */}
                    <Card hover={false}>
                      <h2 className="font-display text-brown-900 font-semibold text-lg mb-4">
                        {isEs ? "Informacion de Contacto" : "Contact Information"}
                      </h2>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-copper mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div>
                            <p className="text-sm font-semibold text-brown-900">
                              {isEs ? "Direccion" : "Address"}
                            </p>
                            <p className="text-brown-400 text-sm">{businessInfo.address.full}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-copper mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <div>
                            <p className="text-sm font-semibold text-brown-900">
                              {isEs ? "Telefono" : "Phone"}
                            </p>
                            <a href={`tel:${businessInfo.phoneRaw}`} className="text-copper hover:underline text-sm">
                              {businessInfo.phone}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-copper mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="text-sm font-semibold text-brown-900">
                              {isEs ? "Correo Electronico" : "Email"}
                            </p>
                            <a href={`mailto:${businessInfo.email}`} className="text-copper hover:underline text-sm">
                              {businessInfo.email}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-copper mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="text-sm font-semibold text-brown-900">
                              {isEs ? "Horario" : "Hours"}
                            </p>
                            <p className="text-brown-400 text-sm">{t(businessInfo.hours)}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-copper mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                          </svg>
                          <div>
                            <p className="text-sm font-semibold text-brown-900">
                              {isEs ? "Area de Servicio" : "Service Area"}
                            </p>
                            <p className="text-brown-400 text-sm">{t(businessInfo.serviceArea)}</p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* HIPAA Notice */}
                    <div className="bg-cream-100 border border-cream-400 rounded-card p-5">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-copper mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-brown-900 mb-1">
                            {isEs ? "Cumplimiento HIPAA" : "HIPAA Compliant"}
                          </p>
                          <p className="text-brown-400 text-xs leading-relaxed">
                            {t(contactContent.hipaaNotice)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Call CTA */}
                    <div className="text-center">
                      <p className="text-brown-400 text-sm mb-2">
                        {t(contactContent.callToAction)}
                      </p>
                      <a
                        href={`tel:${businessInfo.phoneRaw}`}
                        className="inline-flex items-center justify-center font-semibold rounded-button px-6 py-3 text-base bg-copper text-cream-100 hover:bg-copper-dark transition-all duration-200"
                      >
                        {businessInfo.phone}
                      </a>
                    </div>
                  </div>
                </AnimateIn>
              </div>
            </div>
          </div>
        </section>

        <CTABand />
      </main>
    </>
  );
}

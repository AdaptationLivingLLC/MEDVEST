import type { Metadata } from "next";
import { businessInfo } from "@/lib/content";
import JsonLd from "@/components/seo/JsonLd";
import IntakeForm from "@/components/forms/IntakeForm";
import AppDownload from "@/components/sections/AppDownload";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  const title = isEs
    ? "Admisión de Paciente | Medvst"
    : "Patient Intake | Medvst";
  const description = isEs
    ? "Inicie su caso con Medvst en 3 minutos. Admisión segura y cumple con HIPAA."
    : "Start your case with Medvst in 3 minutes. Secure, HIPAA-compliant intake.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/intake`,
      languages: { en: "/en/intake", es: "/es/intake" },
    },
    openGraph: {
      title,
      description,
      url: `${businessInfo.url}/${locale}/intake`,
    },
    robots: { index: false, follow: true },
  };
}

export default async function IntakePage({ params }: Props) {
  const { locale } = await params;
  const isEs = locale === "es";

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isEs ? "Admisión de Paciente" : "Patient Intake",
    url: `${businessInfo.url}/${locale}/intake`,
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
        <section className="bg-cream-100 pt-14 pb-10 lg:pt-20 lg:pb-14">
          <div className="container-main max-w-3xl">
            <p className="text-xs font-semibold tracking-[3px] uppercase text-copper mb-3 text-center">
              {isEs ? "Admisión Segura" : "Secure Intake"}
            </p>
            <h1 className="font-display text-h1-mobile lg:text-h1-desktop text-brown-900 text-center mb-3">
              {isEs
                ? "Comience Su Caso"
                : "Start Your Case"}
            </h1>
            <p className="text-brown-400 text-base lg:text-lg text-center leading-relaxed max-w-xl mx-auto">
              {isEs
                ? "Suba sus documentos de forma segura. Usamos IA para leer automáticamente su identificación y tarjeta de seguro."
                : "Upload your documents securely. We use AI to auto-read your ID and insurance card so you don't have to type it all in."}
            </p>
          </div>
        </section>

        <section className="bg-cream-50 pb-16 lg:pb-24">
          <div className="container-main max-w-3xl">
            <IntakeForm variant="full" />
          </div>
        </section>

        <AppDownload />
      </main>
    </>
  );
}

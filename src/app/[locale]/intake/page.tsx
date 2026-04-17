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

  const trust = isEs
    ? {
        eyebrow: "Cumplimiento Federal",
        title: "Sus archivos están protegidos por la ley",
        intro:
          "Medvst opera como un Asociado Comercial bajo HIPAA. Cada documento que sube se maneja con las mismas protecciones que un hospital o aseguradora está obligado por ley a brindar.",
        hipaaHeading: "Cumplimos con HIPAA y HITECH",
        hipaaBody:
          "El acceso a su Información de Salud Protegida (PHI) está restringido a personal autorizado, registrado en auditoría, y limitado al propósito mínimo necesario para procesar su Medicare Set-Aside.",
        lawsHeading: "Leyes federales y estatales aplicables",
        lawsList: [
          "HIPAA (Health Insurance Portability and Accountability Act)",
          "HITECH Act (Tecnología de Información de Salud)",
          "42 CFR Parte 2 (registros de tratamiento de sustancias)",
          "ADA (Americans with Disabilities Act)",
          "TCPA (Ley de Protección al Consumidor Telefónico)",
          "GLBA y leyes estatales de privacidad aplicables",
        ],
        securityHeading: "Seguridad del nivel bancario",
        securityItems: [
          "Cifrado TLS 1.3 en tránsito",
          "Cifrado AES-256 en reposo",
          "Registros de auditoría inmutables",
          "Autenticación de dos factores para el personal",
          "Almacenamiento en Google Workspace con BAA firmado",
        ],
        rightsHeading: "Sus derechos bajo HIPAA",
        rightsItems: [
          "Derecho a acceder a su expediente",
          "Derecho a solicitar correcciones",
          "Derecho a una contabilidad de divulgaciones",
          "Derecho a revocar su autorización por escrito",
          "Derecho a presentar una queja ante HHS o Medvst",
        ],
        neverHeading: "Lo que Medvst nunca hace",
        neverItems: [
          "Nunca vendemos su información.",
          "Nunca divulgamos PHI para fines de mercadeo.",
          "Nunca compartimos datos sin su autorización escrita, excepto cuando la ley lo permita.",
        ],
        privacyLink: "Aviso completo de Prácticas de Privacidad",
        contactHeading: "Oficial de Privacidad",
        contactBody:
          "Preguntas o quejas sobre el manejo de su información: contacte a nuestro Oficial de Privacidad.",
      }
    : {
        eyebrow: "Federal Compliance",
        title: "Your documents are protected by law",
        intro:
          "Medvst operates as a Business Associate under HIPAA. Every document you upload is handled with the same federal protections a hospital or insurer is legally required to provide.",
        hipaaHeading: "HIPAA & HITECH compliant",
        hipaaBody:
          "Access to your Protected Health Information (PHI) is restricted to authorized personnel, logged for audit, and limited to the minimum necessary to process your Medicare Set-Aside.",
        lawsHeading: "Federal & state laws we comply with",
        lawsList: [
          "HIPAA (Health Insurance Portability and Accountability Act)",
          "HITECH Act (Health Information Technology)",
          "42 CFR Part 2 (substance-use treatment records)",
          "ADA (Americans with Disabilities Act)",
          "TCPA (Telephone Consumer Protection Act)",
          "GLBA and all applicable state privacy laws",
        ],
        securityHeading: "Bank-grade security",
        securityItems: [
          "TLS 1.3 encryption in transit",
          "AES-256 encryption at rest",
          "Immutable audit logs",
          "Two-factor authentication for staff",
          "Google Workspace storage under signed BAA",
        ],
        rightsHeading: "Your rights under HIPAA",
        rightsItems: [
          "Right to access your record",
          "Right to request corrections",
          "Right to an accounting of disclosures",
          "Right to revoke your authorization in writing",
          "Right to file a complaint with HHS or Medvst",
        ],
        neverHeading: "What Medvst never does",
        neverItems: [
          "We never sell your information.",
          "We never disclose PHI for marketing.",
          "We never share data without your written authorization, except as permitted by law.",
        ],
        privacyLink: "Full Notice of Privacy Practices",
        contactHeading: "Privacy Officer",
        contactBody:
          "Questions or complaints about how your information is handled: contact our Privacy Officer.",
      };

  const ShieldIcon = (
    <svg
      className="w-5 h-5 text-success flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );

  const CheckIcon = (
    <svg
      className="w-4 h-4 text-success mt-0.5 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.25}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

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
              {isEs ? "Comience Su Caso" : "Start Your Case"}
            </h1>
            <p className="text-brown-400 text-base lg:text-lg text-center leading-relaxed max-w-xl mx-auto">
              {isEs
                ? "Suba sus documentos de forma segura. Usamos IA para leer automáticamente su identificación y tarjeta de seguro."
                : "Upload your documents securely. We use AI to auto-read your ID and insurance card so you don't have to type it all in."}
            </p>
          </div>
        </section>

        <section className="bg-cream-50 pb-16 lg:pb-24">
          <div className="container-main">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-10 items-start">
              {/* Trust / HIPAA rail — left of the form on lg+, stacks below on mobile */}
              <aside
                className="order-2 lg:order-1 lg:col-span-4 lg:sticky lg:top-24 mt-10 lg:mt-0"
                aria-label={
                  isEs ? "Cumplimiento y Seguridad" : "Compliance & Security"
                }
              >
                <div className="space-y-4">
                  {/* Primary HIPAA badge card */}
                  <div className="rounded-card-lg border border-success/30 bg-white shadow-card p-5">
                    <div className="flex items-center gap-2 mb-2">
                      {ShieldIcon}
                      <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-success">
                        {trust.eyebrow}
                      </p>
                    </div>
                    <h2 className="font-display text-brown-900 text-lg lg:text-xl font-semibold leading-tight mb-2">
                      {trust.title}
                    </h2>
                    <p className="text-brown-500 text-[13px] leading-relaxed">
                      {trust.intro}
                    </p>
                  </div>

                  {/* HIPAA heading card */}
                  <div className="rounded-card-lg border border-cream-300 bg-white shadow-soft p-5">
                    <h3 className="font-semibold text-brown-900 text-sm mb-2">
                      {trust.hipaaHeading}
                    </h3>
                    <p className="text-brown-500 text-[13px] leading-relaxed">
                      {trust.hipaaBody}
                    </p>
                  </div>

                  {/* Applicable laws */}
                  <div className="rounded-card-lg border border-cream-300 bg-white shadow-soft p-5">
                    <h3 className="font-semibold text-brown-900 text-sm mb-3">
                      {trust.lawsHeading}
                    </h3>
                    <ul className="space-y-2">
                      {trust.lawsList.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-brown-500 text-[13px] leading-snug"
                        >
                          {CheckIcon}
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Security controls */}
                  <div className="rounded-card-lg border border-cream-300 bg-white shadow-soft p-5">
                    <h3 className="font-semibold text-brown-900 text-sm mb-3">
                      {trust.securityHeading}
                    </h3>
                    <ul className="space-y-2">
                      {trust.securityItems.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-brown-500 text-[13px] leading-snug"
                        >
                          {CheckIcon}
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Patient rights */}
                  <div className="rounded-card-lg border border-cream-300 bg-white shadow-soft p-5">
                    <h3 className="font-semibold text-brown-900 text-sm mb-3">
                      {trust.rightsHeading}
                    </h3>
                    <ul className="space-y-2">
                      {trust.rightsItems.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-brown-500 text-[13px] leading-snug"
                        >
                          {CheckIcon}
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What we never do */}
                  <div className="rounded-card-lg border-l-4 border-copper bg-copper/5 p-5">
                    <h3 className="font-semibold text-brown-900 text-sm mb-2">
                      {trust.neverHeading}
                    </h3>
                    <ul className="space-y-1.5 text-brown-700 text-[13px] leading-relaxed">
                      {trust.neverItems.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Privacy officer + deep link */}
                  <div className="rounded-card-lg border border-cream-300 bg-cream-100 p-5">
                    <h3 className="font-semibold text-brown-900 text-sm mb-1">
                      {trust.contactHeading}
                    </h3>
                    <p className="text-brown-500 text-[13px] leading-relaxed mb-2">
                      {trust.contactBody}
                    </p>
                    <a
                      href={`mailto:${businessInfo.email}`}
                      className="text-copper hover:text-copper-dark font-semibold text-[13px] underline underline-offset-2"
                    >
                      {businessInfo.email}
                    </a>
                    <div className="mt-3 pt-3 border-t border-cream-300">
                      <a
                        href={`/${locale}/legal#hipaa-notice`}
                        className="text-copper hover:text-copper-dark font-semibold text-[13px] underline underline-offset-2"
                      >
                        {trust.privacyLink} →
                      </a>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Form — stays at the top on desktop, full width on mobile */}
              <div className="order-1 lg:order-2 lg:col-span-8">
                <IntakeForm variant="full" />
              </div>
            </div>
          </div>
        </section>

        <AppDownload />
      </main>
    </>
  );
}

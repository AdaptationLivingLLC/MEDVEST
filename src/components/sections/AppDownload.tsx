"use client";

import { useLocale } from "next-intl";
import AnimateIn from "@/components/ui/AnimateIn";

const copy = {
  en: {
    eyebrow: "Mobile App",
    title: "Track Your Case From Your Phone",
    body: "Download the Medvst client app to check your case status, message our team, and upload additional documents anytime.",
    appleTop: "Download on the",
    googleTop: "Get it on",
    apple: "App Store",
    google: "Google Play",
  },
  es: {
    eyebrow: "Aplicación Móvil",
    title: "Siga Su Caso Desde Su Teléfono",
    body: "Descargue la aplicación cliente de Medvst para revisar el estado de su caso, enviar mensajes a nuestro equipo y subir documentos adicionales en cualquier momento.",
    appleTop: "Descargar en",
    googleTop: "Disponible en",
    apple: "App Store",
    google: "Google Play",
  },
};

const APPLE_URL =
  "https://apps.apple.com/us/app/leadconnector/id1564158632";
const GOOGLE_URL =
  "https://play.google.com/store/apps/details?id=com.leadconnector";

export default function AppDownload({
  compact = false,
}: {
  compact?: boolean;
}) {
  const locale = useLocale();
  const t = locale === "es" ? copy.es : copy.en;

  return (
    <section
      className={[
        "bg-brown-900 text-cream-100",
        compact ? "py-10" : "py-16 lg:py-20",
      ].join(" ")}
    >
      <div className="container-main">
        <AnimateIn direction="up">
          <div
            className={[
              "grid items-center gap-8",
              compact ? "lg:grid-cols-[1fr_auto]" : "lg:grid-cols-2",
            ].join(" ")}
          >
            <div>
              <p className="text-[11px] font-semibold tracking-[2.5px] uppercase text-gold mb-2">
                {t.eyebrow}
              </p>
              <h2
                className={[
                  "font-display font-semibold leading-tight",
                  compact
                    ? "text-xl lg:text-2xl"
                    : "text-h2-mobile lg:text-h2-desktop",
                ].join(" ")}
              >
                {t.title}
              </h2>
              <p
                className={[
                  "mt-3 text-cream-300 leading-relaxed",
                  compact
                    ? "text-sm max-w-xl"
                    : "text-base lg:text-lg max-w-2xl",
                ].join(" ")}
              >
                {t.body}
              </p>
            </div>

            <div
              className={[
                "flex flex-wrap gap-3",
                compact ? "lg:justify-end" : "lg:justify-start",
              ].join(" ")}
            >
              <a
                href={APPLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-black hover:bg-neutral-900 text-white rounded-card px-4 py-2.5 transition-colors"
                aria-label={`${t.appleTop} ${t.apple}`}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.72 12.74c-.03-2.94 2.4-4.34 2.5-4.41-1.36-2-3.48-2.27-4.24-2.3-1.8-.18-3.52 1.06-4.44 1.06-.93 0-2.33-1.03-3.84-1-1.98.03-3.8 1.15-4.82 2.92-2.06 3.58-.53 8.85 1.48 11.74.98 1.41 2.15 3 3.67 2.94 1.48-.06 2.04-.95 3.83-.95 1.78 0 2.29.95 3.86.92 1.6-.03 2.6-1.44 3.57-2.86 1.13-1.64 1.59-3.25 1.62-3.34-.03-.01-3.11-1.19-3.14-4.72zM14.75 4.4c.8-.97 1.34-2.32 1.19-3.68-1.15.05-2.56.77-3.39 1.73-.74.86-1.39 2.26-1.22 3.57 1.29.1 2.61-.66 3.42-1.62z" />
                </svg>
                <div className="text-left leading-tight">
                  <p className="text-[10px] uppercase tracking-wider opacity-80">
                    {t.appleTop}
                  </p>
                  <p className="text-base font-semibold">{t.apple}</p>
                </div>
              </a>

              <a
                href={GOOGLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-black hover:bg-neutral-900 text-white rounded-card px-4 py-2.5 transition-colors"
                aria-label={`${t.googleTop} ${t.google}`}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M3.6 2.6A2 2 0 003 4v16a2 2 0 00.6 1.4L13 12 3.6 2.6z"
                    fill="#32BBFF"
                  />
                  <path
                    d="M16.8 8.8L5.6 2.2a2 2 0 00-2 .4L13 12l3.8-3.2z"
                    fill="#32BBFF"
                  />
                  <path
                    d="M20.4 10.6L17 8.7 13 12l4 3.3 3.4-1.9a2 2 0 000-3.5z"
                    fill="#FFBC00"
                  />
                  <path
                    d="M3.6 21.4a2 2 0 002 .4l11.2-6.6-3.8-3.2-9.4 9.4z"
                    fill="#3BCC3B"
                  />
                </svg>
                <div className="text-left leading-tight">
                  <p className="text-[10px] uppercase tracking-wider opacity-80">
                    {t.googleTop}
                  </p>
                  <p className="text-base font-semibold">{t.google}</p>
                </div>
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const meta = useTranslations("meta");
  const nav = useTranslations("nav");

  const serviceLinks = [
    { label: "MSA Administration", href: "/services/msa-administration" },
    { label: "Lien Resolution", href: "/services/lien-resolution" },
    { label: "Settlement Consulting", href: "/services/settlement-consulting" },
    { label: "Trust Services", href: "/services/trust-services" },
    { label: "Liability Settlements", href: "/services/liability-settlements" },
  ];

  const quickLinks = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "howItWorks", href: "/how-it-works" },
    { key: "results", href: "/results" },
    { key: "testimonials", href: "/testimonials" },
    { key: "faq", href: "/faq" },
    { key: "contact", href: "/contact" },
    { key: "portal", href: "/portal" },
    { key: "resources", href: "/resources" },
  ];

  return (
    <footer className="bg-brown-900 text-cream-200 pt-16 pb-8">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-copper to-cream-500 rounded-lg flex items-center justify-center">
                <span className="text-brown-900 font-bold text-sm">MV</span>
              </div>
              <div className="flex flex-col">
                <span className="text-cream-100 font-bold text-base tracking-wide leading-none">
                  MED VEST
                </span>
                <span className="text-cream-500 text-[10px] tracking-wider uppercase leading-none mt-0.5">
                  {meta("tagline")}
                </span>
              </div>
            </Link>
            <p className="text-sm text-cream-500 leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-cream-100 text-base font-semibold mb-4">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-500 hover:text-cream-100 transition-colors"
                  >
                    {nav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-cream-100 text-base font-semibold mb-4">
              {t("ourServices")}
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-500 hover:text-cream-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-cream-100 text-base font-semibold mb-4">
              {t("contactUs")}
            </h4>
            <ul className="space-y-3 text-sm text-cream-500">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-copper flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{meta("address")}</span>
              </li>
              <li>
                <a
                  href={`tel:${meta("phone").replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-2 hover:text-cream-100 transition-colors"
                >
                  <svg className="w-4 h-4 text-copper flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {meta("phone")}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${meta("email")}`}
                  className="flex items-center gap-2 hover:text-cream-100 transition-colors"
                >
                  <svg className="w-4 h-4 text-copper flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {meta("email")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-brown-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-cream-500">{t("copyright")}</p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-cream-500">
              <Link href="/legal" className="hover:text-cream-100 transition-colors">
                {t("privacy")}
              </Link>
              <Link href="/legal" className="hover:text-cream-100 transition-colors">
                {t("terms")}
              </Link>
              <Link href="/legal" className="hover:text-cream-100 transition-colors">
                {t("hipaa")}
              </Link>
              <Link href="/legal" className="hover:text-cream-100 transition-colors">
                {t("accessibility")}
              </Link>
            </div>
          </div>
          <p className="text-center text-[10px] text-brown-700 mt-4">
            {t("builtBy")}
          </p>
        </div>
      </div>
    </footer>
  );
}

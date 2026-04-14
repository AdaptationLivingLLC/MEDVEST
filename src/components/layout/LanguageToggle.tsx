"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export default function LanguageToggle() {
  const locale = useLocale();

  const pathname = usePathname();
  const newLocale = locale === "en" ? "es" : "en";

  // Replace the current locale prefix with the new one
  const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);

  return (
    <a
      href={newPath}
      className="text-sm font-medium text-brown-500 border border-brown-500 px-3 py-1.5 rounded-md hover:bg-brown-500 hover:text-cream-100 transition-colors"
      aria-label={locale === "en" ? "Cambiar a Espanol" : "Switch to English"}
    >
      {locale === "en" ? "ES" : "EN"}
    </a>
  );
}

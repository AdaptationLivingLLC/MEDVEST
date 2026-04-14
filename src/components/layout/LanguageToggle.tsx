"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export default function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const newLocale = locale === "en" ? "es" : "en";
  const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);

  return (
    <div className="flex items-center gap-1.5">
      {/* English */}
      <a
        href={locale === "en" ? pathname : newPath}
        className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold tracking-wide transition-colors ${
          locale === "en"
            ? "bg-white/15 text-white"
            : "text-white/50 hover:text-white"
        }`}
        aria-current={locale === "en" ? "true" : undefined}
      >
        <svg viewBox="0 0 36 36" className="w-4 h-4 flex-shrink-0 rounded-sm overflow-hidden" aria-hidden="true">
          <rect fill="#B22234" width="36" height="36" />
          <rect fill="#fff" y="2.77" width="36" height="2.77" />
          <rect fill="#fff" y="8.31" width="36" height="2.77" />
          <rect fill="#fff" y="13.85" width="36" height="2.77" />
          <rect fill="#fff" y="19.38" width="36" height="2.77" />
          <rect fill="#fff" y="24.92" width="36" height="2.77" />
          <rect fill="#fff" y="30.46" width="36" height="2.77" />
          <rect fill="#3C3B6E" width="14.4" height="19.38" />
        </svg>
        <span>EN</span>
      </a>

      <span className="text-white/20 text-xs">|</span>

      {/* Spanish */}
      <a
        href={locale === "es" ? pathname : newPath}
        className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold tracking-wide transition-colors ${
          locale === "es"
            ? "bg-white/15 text-white"
            : "text-white/50 hover:text-white"
        }`}
        aria-current={locale === "es" ? "true" : undefined}
        aria-label={locale === "en" ? "Cambiar a Espanol" : "Switch to English"}
      >
        <svg viewBox="0 0 36 36" className="w-4 h-4 flex-shrink-0 rounded-sm overflow-hidden" aria-hidden="true">
          <rect fill="#fff" width="36" height="36" />
          <rect fill="#006847" width="12" height="36" />
          <rect fill="#CE1126" x="24" width="12" height="36" />
          <circle fill="#6B3E2E" cx="18" cy="18" r="3" />
          <circle fill="#006847" cx="18" cy="18" r="2" />
        </svg>
        <span>ES</span>
      </a>
    </div>
  );
}

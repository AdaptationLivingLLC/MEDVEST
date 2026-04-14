"use client";

import { useTranslations } from "next-intl";

export default function StickyMobileCTA() {
  const meta = useTranslations("meta");
  const nav = useTranslations("nav");

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-brown-900 border-t border-brown-800 p-3 flex gap-3 lg:hidden z-40">
      <a
        href={`tel:${meta("phone").replace(/[^0-9+]/g, "")}`}
        className="flex-1 text-center bg-cream-100 text-brown-900 py-3 rounded-button font-semibold text-sm"
      >
        {nav("callUs")}
      </a>
      <a
        href="/contact"
        className="flex-1 text-center bg-copper text-cream-100 py-3 rounded-button font-semibold text-sm"
      >
        {nav("getStarted")}
      </a>
    </div>
  );
}

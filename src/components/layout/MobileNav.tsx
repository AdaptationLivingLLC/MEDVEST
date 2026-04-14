"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services/msa-administration" },
  { key: "howItWorks", href: "/how-it-works" },
  { key: "results", href: "/results" },
  { key: "testimonials", href: "/testimonials" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
  { key: "portal", href: "/portal" },
] as const;

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col justify-center items-center w-10 h-10 gap-1.5"
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        <span
          className={`block w-6 h-0.5 bg-brown-900 transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-brown-900 transition-opacity duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-4 h-0.5 bg-brown-900 transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2 !w-6" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-[73px] bg-cream-100 z-40 overflow-y-auto">
          <nav className="container-main py-8">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-4 text-lg font-medium text-brown-900 hover:bg-cream-300 rounded-card transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 px-4">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-brown-900 text-cream-100 py-3 px-6 rounded-button font-semibold text-base hover:bg-brown-800 transition-colors"
              >
                {t("getStarted")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

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
          className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-4 h-0.5 bg-white transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2 !w-6" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-[73px] bg-navy-dark z-40 overflow-y-auto">
          <nav className="container-main py-8">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-4 text-lg font-medium text-white/90 hover:bg-white/10 rounded-card transition-colors"
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
                className="block w-full text-center bg-gold text-navy-dark py-3 px-6 rounded-button font-bold text-base hover:bg-gold-light transition-colors uppercase tracking-wide"
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

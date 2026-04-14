"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageToggle from "./LanguageToggle";
import MobileNav from "./MobileNav";

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services/msa-administration" },
  { key: "howItWorks", href: "/how-it-works" },
  { key: "results", href: "/results" },
  { key: "contact", href: "/contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 bg-cream-100/95 backdrop-blur-sm border-b border-cream-400">
      <div className="container-main">
        <nav className="flex items-center justify-between h-[73px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-brown-500 to-copper rounded-lg flex items-center justify-center">
              <span className="text-cream-100 font-bold text-sm">MV</span>
            </div>
            <div className="flex flex-col">
              <span className="text-brown-900 font-bold text-base tracking-wide leading-none">
                MED VEST
              </span>
              <span className="text-brown-300 text-[10px] tracking-wider uppercase leading-none mt-0.5">
                {t("home") === "Inicio"
                  ? "Expertos en Medicare Set-Aside"
                  : "Medicare Set-Aside Experts"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-brown-400 hover:text-brown-900 transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <Link
                href="/contact"
                className="bg-brown-900 text-cream-100 px-5 py-2.5 rounded-button text-sm font-semibold hover:bg-brown-800 transition-colors"
              >
                {t("getStarted")}
              </Link>
            </div>
          </div>

          {/* Mobile: Language Toggle + Hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageToggle />
            <MobileNav />
          </div>
        </nav>
      </div>
    </header>
  );
}

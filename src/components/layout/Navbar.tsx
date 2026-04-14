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
    <header className="sticky top-0 z-50 bg-navy-dark/95 backdrop-blur-md border-b border-white/10">
      <div className="container-main">
        <nav className="flex items-center justify-between h-[73px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-light rounded-lg flex items-center justify-center shadow-md">
              <span className="text-navy-dark font-bold text-sm tracking-wide">MV</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-base tracking-widest leading-none uppercase">
                MED VEST
              </span>
              <span className="text-white/40 text-[9px] tracking-wider uppercase leading-none mt-1">
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
                    className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <Link
                href="/contact"
                className="bg-gold text-navy-dark px-5 py-2.5 rounded-button text-sm font-bold hover:bg-gold-light transition-colors uppercase tracking-wide"
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

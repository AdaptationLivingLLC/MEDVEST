"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  const t = useTranslations("hero");
  const meta = useTranslations("meta");

  return (
    <section className="bg-cream-100 pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div className="container-main text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[3px] uppercase text-brown-500 mb-4"
        >
          {t("label")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-h1-mobile lg:text-h1-desktop text-brown-900 max-w-3xl mx-auto"
        >
          {t("title")}{" "}
          <span className="text-copper">{t("titleAccent")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 text-brown-400 text-base lg:text-lg leading-relaxed max-w-xl mx-auto"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/contact" size="lg">
            {t("cta")}
          </Button>
          <Button href="/how-it-works" variant="outline" size="lg">
            {t("ctaSecondary")}
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 text-sm text-brown-300"
        >
          {t("orCall")}{" "}
          <a
            href={`tel:${meta("phone").replace(/[^0-9+]/g, "")}`}
            className="text-copper font-semibold hover:underline"
          >
            {meta("phone")}
          </a>
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import IntakeForm from "@/components/forms/IntakeForm";

export default function Hero() {
  const t = useTranslations("hero");
  const meta = useTranslations("meta");

  return (
    <section className="bg-cream-100 pt-12 pb-14 lg:pt-16 lg:pb-20">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left column — intro + phone CTA */}
          <div className="lg:pt-4">
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
              className="font-display text-h1-mobile lg:text-h1-desktop text-brown-900"
            >
              {t("title")}{" "}
              <span className="text-copper">{t("titleAccent")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-brown-400 text-base lg:text-lg leading-relaxed max-w-xl"
            >
              {t("subtitle")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 text-sm text-brown-500"
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

          {/* Right column — intake form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <IntakeForm variant="hero" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";

export default function CTABand() {
  const t = useTranslations("cta");
  const meta = useTranslations("meta");

  return (
    <section className="bg-brown-900 py-16 lg:py-20">
      <div className="container-main text-center">
        <AnimateIn direction="up">
          <h2 className="font-display text-h2-mobile lg:text-h2-desktop text-cream-100">
            {t("title")}
          </h2>
          <p className="mt-3 text-cream-500 text-base lg:text-lg max-w-lg mx-auto">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="dark" size="lg">
              {t("primary")}
            </Button>
            <Button
              href={`tel:${meta("phone").replace(/[^0-9+]/g, "")}`}
              variant="outline"
              size="lg"
              external
              className="border-cream-500 text-cream-100 hover:bg-cream-100 hover:text-brown-900"
            >
              {t("secondary")} {meta("phone")}
            </Button>
          </div>
          <p className="mt-5 text-sm text-copper font-semibold">
            {t("spanish")}
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}

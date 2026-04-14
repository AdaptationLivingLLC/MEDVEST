import type { MetadataRoute } from "next";

const BASE_URL = "https://medvst.com";

const routes = [
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/how-it-works", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/services/msa-administration", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/services/lien-resolution", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/services/settlement-consulting", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/services/trust-services", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/services/liability-settlements", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/results", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/testimonials", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/portal", changeFrequency: "monthly" as const, priority: 0.5 },
  { path: "/resources", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/legal", changeFrequency: "yearly" as const, priority: 0.3 },
];

const locales = ["en", "es"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${route.path}`,
            es: `${BASE_URL}/es${route.path}`,
          },
        },
      });
    }
  }

  return entries;
}

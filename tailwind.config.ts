import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fdfcfa",
          100: "#faf7f2",
          200: "#f5efe6",
          300: "#f0ebe2",
          400: "#e8dfd3",
          500: "#d4c5a9",
        },
        brown: {
          50: "#faf5f0",
          100: "#f0e6d9",
          200: "#d4c5a9",
          300: "#b3a18a",
          400: "#8b7355",
          500: "#8b5e3c",
          600: "#7a5235",
          700: "#5c3d28",
          800: "#3d2819",
          900: "#2c1810",
        },
        copper: {
          DEFAULT: "#b37d4e",
          light: "#c99a6b",
          dark: "#8b5e3c",
        },
        success: {
          DEFAULT: "#2d6a4f",
          light: "#40916c",
        },
      },
      fontFamily: {
        display: [
          "Playfair Display",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        body: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "12px",
        "card-lg": "16px",
        button: "24px",
      },
      boxShadow: {
        card: "0 2px 12px rgba(44, 24, 16, 0.06)",
        "card-hover": "0 8px 30px rgba(44, 24, 16, 0.1)",
        soft: "0 1px 4px rgba(44, 24, 16, 0.04)",
      },
      fontSize: {
        "h1-mobile": ["2rem", { lineHeight: "1.2", fontWeight: "700" }],
        "h1-desktop": ["3.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        "h2-mobile": ["1.5rem", { lineHeight: "1.25", fontWeight: "700" }],
        "h2-desktop": ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
        "h3-mobile": ["1.25rem", { lineHeight: "1.3", fontWeight: "600" }],
        "h3-desktop": ["1.75rem", { lineHeight: "1.25", fontWeight: "600" }],
      },
      spacing: {
        section: "5rem",
        "section-lg": "7rem",
      },
      maxWidth: {
        container: "1240px",
        narrow: "900px",
      },
    },
  },
  plugins: [],
};
export default config;

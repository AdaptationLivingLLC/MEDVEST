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
          50: "#fafafa",
          100: "#f5f5f4",
          200: "#eeece8",
          300: "#e2dfda",
          400: "#d1cdc6",
          500: "#b8b3aa",
        },
        brown: {
          50: "#f8f6f4",
          100: "#eae6e1",
          200: "#d1cdc6",
          300: "#9c9589",
          400: "#6b6459",
          500: "#524b40",
          600: "#443d34",
          700: "#362f28",
          800: "#1e1a16",
          900: "#111010",
        },
        copper: {
          DEFAULT: "#b37d4e",
          light: "#c99a6b",
          dark: "#8b5e3c",
        },
        navy: {
          DEFAULT: "#0f2137",
          light: "#1a3350",
          dark: "#0a1628",
        },
        gold: {
          DEFAULT: "#c9a356",
          light: "#d4b876",
          dark: "#a6862f",
        },
        success: {
          DEFAULT: "#006847",
          light: "#15803d",
        },
      },
      fontFamily: {
        display: [
          "Cinzel",
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
        card: "8px",
        "card-lg": "12px",
        button: "6px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)",
        soft: "0 1px 2px rgba(0, 0, 0, 0.04)",
        strong: "0 20px 40px rgba(0, 0, 0, 0.15)",
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

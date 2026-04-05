import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f2922A",
        dark: "#000000",
      },
      fontFamily: {
        sans: "Switzer, system-ui, sans-serif",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        subtle: "0 12px 30px -16px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;

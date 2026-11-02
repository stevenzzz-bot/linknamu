import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: "rgb(var(--accent) / <alpha-value>)",
        brand: { DEFAULT: "#2f9e5b", light: "#e3f4ea", dark: "#4cc27c", deep: "#1f3328" },
      },
    },
  },
  plugins: [],
};

export default config;

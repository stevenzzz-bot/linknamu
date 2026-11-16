import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        heading: "var(--heading)",
        muted: "var(--text-muted)",
        line: "var(--border)",
        point: "var(--point)",
        placeholder: "var(--placeholder)",
        rule: "var(--rule)",
        "point-on-dark": "var(--point-on-dark)",
      },
    },
  },
  plugins: [],
};

export default config;

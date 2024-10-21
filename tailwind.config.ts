import type { Config } from "tailwindcss";
import fluid, { extract, fontSize, screens } from "fluid-tailwind";

const config: Config = {
  content: {
    files: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract,
  },
  theme: {
    fontSize,
    screens,
    extend: {
      colors: {
        foreground: "var(--foreground)",
        background: "var(--background)",
        "bg-solid": "var(--bg-solid)",
        border: "var(--border)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      fontFamily: {
        caveat: "var(--font-caveat)",
        nighty: "var(--font-nighty)",
      },
    },
  },
  plugins: [fluid({
    checkSC144: false,
  })],
};
export default config;

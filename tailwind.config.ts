// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xl: "1280px",
        "2xl": "1440px",
      },
      fontSize: {
        fluid: "clamp(1rem, 0.428571rem + 1.190476vw, 1.5rem)",
      },
    },
  },
  plugins: [],
};

export default config;

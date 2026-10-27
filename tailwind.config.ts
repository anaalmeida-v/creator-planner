import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#fcfbf9",
          muted: "#f8f6f2",
        },
        ink: {
          DEFAULT: "#2c2c2c",
          muted: "#888279",
          soft: "#a09a90",
        },
        line: {
          DEFAULT: "#e8e4de",
          strong: "#dfdcd5",
        },
        coffee: {
          DEFAULT: "#8b7355",
          dark: "#5c4a38",
        },
        badge: {
          long: "#f3efe8",
          shorts: "#fef3c7",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 30px rgba(44, 44, 44, 0.04)",
        drawer: "-12px 0 40px rgba(44, 44, 44, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;

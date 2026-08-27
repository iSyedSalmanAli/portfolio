import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        card: "var(--card)",
        border: "var(--border)",
        accent: {
          DEFAULT: "var(--accent)",
          secondary: "var(--accent-secondary)",
          tertiary: "var(--accent-tertiary)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "scroll-line": "scroll-line 2s infinite",
        blink: "blink 1s step-end infinite",
        "fade-up": "fade-up 0.8s ease both",
        "fade-down": "fade-down 0.8s ease both",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 8px #22c55e" },
          "50%": { opacity: "0.5", boxShadow: "0 0 16px #22c55e" },
        },
        "scroll-line": {
          "0%": { top: "-50%" },
          "100%": { top: "150%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

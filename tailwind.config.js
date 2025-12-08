/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E63E32", // Brand Red
          dark: "#B92B21",
          glow: "#FF6B61",
        },
        background: "#050505",
        surface: "#0F0F0F",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
        fadeInUp: "fadeInUp 0.6s ease-out both",
        fadeIn: "fadeIn 0.8s ease-out both",
        pulseSoft: "pulseSoft 2.4s ease-in-out infinite",
        breathe: "breathe 10s ease-in-out infinite alternate",
        scanline: "scanline 1s linear",
        scanlineLoop: "scanline 1s linear infinite",
        routeWipe: "routeWipe 0.6s ease-out", // NEW – page transition bar
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
        breathe: {
          "0%": { opacity: "0.4", transform: "scale(1)" },
          "100%": { opacity: "0.85", transform: "scale(1.08)" },
        },
        scanline: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "0",
          },
          "20%": {
            opacity: "0.25",
          },
          "100%": {
            transform: "translateY(120%)",
            opacity: "0",
          },
        },
        routeWipe: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "20%": {
            opacity: "0.7",
          },
          "60%": {
            transform: "translateX(0%)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

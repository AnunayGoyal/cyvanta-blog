/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // specific to your src folder if you use it
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E63E32", // Your Brand Red
          dark: "#B92B21",
          glow: "#FF6B61",
        },
        background: "#050505",
        surface: "#0F0F0F",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"], // Your terminal font
      },
      // Animation definitions
      animation: {
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // The plugin we added for the blog
  ],
};

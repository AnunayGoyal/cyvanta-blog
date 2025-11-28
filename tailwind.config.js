/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: "#0d1117",    // Deep Navy
          gray: "#161b22",     // Card Background
          text: "#c9d1d9",     // Main Text
          muted: "#8b949e",    // Muted Text
        },
        neon: {
          green: "#00ff41",    // Hacker Green
          blue: "#0071e3",     // Accent Blue
          red: "#ff0055",      // Attack Red
        },
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, #30363d 1px, transparent 1px), linear-gradient(to bottom, #30363d 1px, transparent 1px)",
      },
    },
  },
  // ACTIVATE THE PLUGIN HERE
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
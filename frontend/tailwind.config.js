/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // "Correspondence desk" palette: a dark ink-navy desk surrounding a
        // pale paper card where the actual writing happens.
        desk: {
          DEFAULT: "#161B2E", // main background, deep ink-navy
          rule: "#2A3350", // hairlines/borders on the dark desk
          soft: "#1F2540", // slightly raised dark surface (e.g. footer)
        },
        paper: {
          DEFAULT: "#FAF8F3", // the writing surface itself
          muted: "#F1EDE3", // inset fields on the paper (inputs, textareas)
          rule: "#DCD5C4", // hairlines/borders on paper
        },
        ink: {
          DEFAULT: "#1F2A44", // primary text on paper
          soft: "#5B6270", // secondary/muted text
          pale: "#EDEFF7", // text on dark surfaces
        },
        teal: {
          50: "#EAF3F1",
          100: "#CFE4DF",
          500: "#2F6F62",
          600: "#245A50",
          700: "#1B453D",
        },
        brass: {
          DEFAULT: "#C9A227",
          soft: "#E4CE7D",
          dark: "#9A7A17",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
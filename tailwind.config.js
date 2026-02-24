/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sora", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%":   { opacity: "0", transform: "translateY(6px) translateX(-50%)" },
          "100%": { opacity: "1", transform: "translateY(0)  translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};
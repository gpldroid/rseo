/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./**/*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          500: "#1a73e8",
          600: "#1557b0",
          700: "#104491",
          darkBg: "#0f172a",
          darkCard: "#1e293b",
          darkBorder: "#334155"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

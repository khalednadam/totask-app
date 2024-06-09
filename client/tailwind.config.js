/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6DB193",
        secondary: "#FF5959",
        darkPrimary: "#6DB193",
        error1: "#FFC1CE",
        error2: "#94354B",
        success1: "#D7EADF",
        success2: "#61A47C",
        alert1: "#F9C7A4",
        alert2: "#A1673F",
        info1: "#C5E7E8",
        info2: "#33898A",
        "light-background": "#FAFAFA",
        "on-light-background": "#1C1C1E",
        "dark-background": "#1C1C1E",
        "on-dark-background": "#FAFAFA",
        "hover-light": "#d2d2d2",
        "hover-dark": "#5b5b5b"
      },
      fontFamily: {
        lato: 'degular-text, sans-serif', // Adds a new `font-display` class
      }
    },

  },
  plugins: [],
};

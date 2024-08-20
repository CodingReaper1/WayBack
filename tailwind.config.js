/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxs: "300px",
        xs: "386px",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        "3xl": "0 5px 15px rgba(0,0,0,0.35)",
      },
      placeholderColor: {
        "custom-gray": "#888",
      },
    },
  },
  plugins: [],
};

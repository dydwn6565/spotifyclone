/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        128: "32rem",
        256:"64rem",
        320:"80rem"
      },
    },
  },
  plugins: [],
};



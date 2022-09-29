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
        256: "64rem",
        320: "80rem",
      },
      height: {
        128: "32rem",
        196:"48rem",
        256: "64rem",
        320: "80rem",
      },
      scale: {
        875: "8.75",
      },
    },
  },
  plugins: [],
};



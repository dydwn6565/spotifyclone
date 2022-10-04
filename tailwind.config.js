/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "2xlm": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xlm: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lgm: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      mdm: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      smm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      width: {
        128: "32rem",
        256: "64rem",
        320: "80rem",
      },
      height: {
        128: "32rem",
        196: "48rem",
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



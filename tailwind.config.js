/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "375px",     // Small phones
      sm: "640px",     // Phones
      md: "768px",     // Tablets
      lg: "1024px",    // Laptops
      xl: "1280px",    // Desktops
      "2xl": "1536px", // Large screens
      "3xl": "1920px", // Ultra-wide monitors
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "3rem",
        },
      },
    },
  },
  plugins: [],
};

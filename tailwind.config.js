/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  purge: ['./index.html', './src/**/*.{tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
};

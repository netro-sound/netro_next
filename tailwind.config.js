/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {},
  },
  daisyui: {
    darkTheme: 'halloween',
  },
  plugins: [require('daisyui')],
};

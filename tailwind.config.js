/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['boneFont', 'sans-serif'], // Add your custom font here
      },
    },
  },
  plugins: [],
}
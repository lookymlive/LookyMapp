/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#bb86fc',
        background: '#121212',
        surface: '#1e1e1e',
        text: '#ffffff',
      },
    },
  },
  plugins: [],
}

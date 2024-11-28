/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        myFont: ['myFont', 'cursive'],
      },
      colors: {
        primary: '#3f455e',
        secondary: '#d7d4d7',
        third: '#8f2172',
        fourth: '#c08b3f',
        backcolor: '#020617',
        buttonColor: '#0f172a',
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default  {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        secon: "rgb(0 213 160)",
      },
      fontFamily: {
        epilogue: ['Epilogue', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'], 
      },
      boxShadow: {
        secondary: '10px 10px 20px rgba(2, 2, 2, 0.25)',
      },
    },
  },
  plugins: [],
}
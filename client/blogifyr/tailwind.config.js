/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./src/**/**/*.{html,js,jsx}",
    "./public/**/*.{html,js,jsx}",      
  ],
  theme: {
    colors: {
      'primary': '#FF4500' ,
      'secondary': '#FFA500',
      'accent': '#FFD700',
      'dark': '#333333',
      'white': '#F5F5F5',
      'gray': '#CCCCCC',
    },
    extend: {},
  },
  plugins: [],
}
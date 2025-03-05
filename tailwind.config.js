// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}" // Ensure this includes all your React files
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
      },
      backgroundColor:{
        primary: '#212121',
        secondary: '#3F3F3F',
        tertiary: '#505050',
        quaternary: '#606060',
        quinary: '#707070',
        senary: '#808080',
        septenary: '#909090',
        octonary: '#A0A0A0',
        nonary: '#B0B0B0',
        denary: '#C0C0C0',
        tenary: '#D0D0D0',
        eleventy: '#E0E0E0',
        twelfty: '#F0F0F0',
        thirty: '#FFFFFF'
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    "./src/**/*.{js,ts,jsx,tsx}",
    "/public/index.html"
  ],
  theme: {
    screens:{
      sm: '338px',
      sm2: '448px',
      sm3: '568px',

      md: '742px',
      md2: '944px',
      
      lg:'1055px'
    },

    extend: {
      colors: {
        startColor: 'rgb(55, 50, 50)',
        mainColor: 'rgb(55, 50, 50)',
        darkColor: 'rgb(108, 104, 104)'
      }
    },
  },
  plugins: [],
}


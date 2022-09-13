/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily:{
      sams: ['Inter', 'sans-serif']
    },
    extend: {
      colors:{        
      },
      backgroundImage:{
        'nlw-gradient': 'linear-gradient(50.86deg, #9572FC 23.08%, #43E7AD 50.92%, #E1D55D 44.57%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
        galaxy: "url('/imgs/fundo.png')",
      }
    },
  },
  plugins: [],
}

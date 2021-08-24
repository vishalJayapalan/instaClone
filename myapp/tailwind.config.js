module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width:{
        '935px':'935px'
      },
      maxWidth:{
        '935px':'935px'
      },
      heigth:{
        '54px':'54px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

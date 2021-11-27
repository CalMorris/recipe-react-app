module.exports = {
  purge: [
    './src/**/*.html', // this is a purge test
    './src/**/*.jsx'
  ],

  plugins: [
    require('postcss-100vh-fix')
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  corePlugins: {
    wordBreak: false
  }
}

module.exports = {
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

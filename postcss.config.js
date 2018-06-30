const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')
// const rtl = require('postcss-rtl')

module.exports = ctx => ({
  plugins: [
    autoprefixer({
      browsers: ['>0.5%', 'last 2 versions', 'not dead', 'not op_mini all']
    }),
    // rtl(),
    mqpacker()
  ]
})

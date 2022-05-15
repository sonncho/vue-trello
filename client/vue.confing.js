const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  lintOnSave: true,
  configureWebpack: {
    performance: {
      hints: false
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}

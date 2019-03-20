'use strict'

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/'
  },
  build: {
    assetsRoot: resolve('dist'),
    assetsSubDirectory: 'static',
    productionSourceMap: false,
    assetsPublicPath: '/'
  }
}

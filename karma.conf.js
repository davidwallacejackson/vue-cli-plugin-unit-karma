const merge = require('webpack-merge')

module.exports = (webpackConfig) => {
  delete webpackConfig.entry
  webpackConfig = merge(webpackConfig, {
    devtool: 'inline-source-map'
  })

  return {
    files: [
      'tests/unit/index.js'
    ],

    browsers: ['Chrome'],

    frameworks: ['mocha', 'chai'],

    preprocessors: {
      'tests/unit/index.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig
  }
}

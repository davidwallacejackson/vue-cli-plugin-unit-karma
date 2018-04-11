module.exports = (webpackConfig) => {
  delete webpackConfig.entry

  return {
    files: [
      'tests/unit/index.js'
    ],

    browsers: ['Chrome'],

    frameworks: ['mocha', 'chai'],

    preprocessors: {
      'tests/unit/index.js': ['webpack']
    },

    webpack: webpackConfig
  }
}

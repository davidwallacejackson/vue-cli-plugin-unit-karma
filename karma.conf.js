const merge = require('webpack-merge')
const _ = require('lodash')

module.exports = (optionsForThisPlugin, webpackConfig) => {
  delete webpackConfig.entry
  webpackConfig = merge(webpackConfig, {
    devtool: 'inline-source-map'
  })

  let karmaConfig = {
    files: optionsForThisPlugin.files,

    browsers: ['Chrome'],

    frameworks: ['mocha', 'chai'],

    preprocessors: _(optionsForThisPlugin.files)
      .map((filenameOrPattern) => [filenameOrPattern, ['webpack', 'sourcemap']])
      .fromPairs()
      .value(),

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    }
  }

  if (optionsForThisPlugin.karmaConfig) {
    // merge in karma config from project
    Object.assign(karmaConfig, optionsForThisPlugin.karmaConfig)
  }

  console.log(karmaConfig)
  return karmaConfig
}

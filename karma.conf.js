const karmaConstants = require('karma').constants
const _ = require('lodash')
const merge = require('webpack-merge')

module.exports = ({optionsForThisPlugin, webpackConfig, watch, junit}) => {
  delete webpackConfig.entry
  webpackConfig = merge(webpackConfig, {
    devtool: optionsForThisPlugin.devtool || 'inline-source-map'
  })

  let karmaConfig = {
    files: optionsForThisPlugin.files,

    logLevel: karmaConstants.LOG_ERROR,

    reporters: ['mocha'],

    autoWatch: watch,
    singleRun: !watch,

    browsers: ['Chrome', 'Firefox'],

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

  if (junit) {
    karmaConfig.reporters.push('junit')
    karmaConfig.junitReporter = {
      outputDir: junit
    }
  }

  if (optionsForThisPlugin.karmaConfig) {
    // merge in karma config from project
    Object.assign(karmaConfig, optionsForThisPlugin.karmaConfig)
  }

  return karmaConfig
}

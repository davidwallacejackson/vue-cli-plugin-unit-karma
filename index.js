module.exports = (api, projectOptions) => {
  let optionsForThisPlugin = require('./config-defaults')

  if (projectOptions.pluginOptions && projectOptions.pluginOptions.karma) {
    Object.assign(optionsForThisPlugin, projectOptions.pluginOptions.karma)
  }

  api.registerCommand('test',
    {
      'description': 'run unit tests with karma-webpack',
      'usage': 'vue-cli-service test'
    },
    (args, rawArgv) => {
      api.setMode('test')
      let webpackConfigForTests = api.resolveChainableWebpackConfig()
        .target()
          .clear()
      webpackConfigForTests = webpackConfigForTests.toConfig()

      return new Promise((resolve, reject) => {
        let Server = require('karma').Server
        let generateKarmaConfig = require('./karma.conf')

        let server = new Server(
          generateKarmaConfig(optionsForThisPlugin, webpackConfigForTests),
          function (exitCode) {
            console.log('Karma has exited with ' + exitCode)

            if (exitCode === 0) {
              resolve(exitCode)
            } else {
              reject(exitCode)
            }
          })

        server.start()
      })
    })
}
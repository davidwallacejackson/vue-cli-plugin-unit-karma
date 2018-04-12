module.exports = (api, projectOptions) => {
  let optionsForThisPlugin = require('./config-defaults')

  if (projectOptions.pluginOptions && projectOptions.pluginOptions.karma) {
    Object.assign(optionsForThisPlugin, projectOptions.pluginOptions.karma)
  }

  api.registerCommand('test',
    {
      'description': 'run unit tests with karma-webpack',
      'usage': 'vue-cli-service test',
      options: {
        '--watch, -w': 'run in watch mode',
        '--junit [dirname], -j [dirname]': 'output JUnit-style XML test reports for each browser'
      }
    },
    (args, rawArgv) => {
      api.setMode('test')
      let webpackConfigForTests = api.resolveChainableWebpackConfig()
        .target()
          .clear()
      webpackConfigForTests = webpackConfigForTests.toConfig()

      return new Promise((resolve, reject) => {
        let KarmaServer = require('karma').Server
        let generateKarmaConfig = require('./karma.conf')

        let expressServer
        if (optionsForThisPlugin.expressServer) {
          let expressApp = require('express')()
          optionsForThisPlugin.expressServer.setup(expressApp)
          expressServer = expressApp.listen(optionsForThisPlugin.expressServer.port)
        }

        let karmaServer = new KarmaServer(
          generateKarmaConfig({
            optionsForThisPlugin,
            webpackConfig: webpackConfigForTests,
            watch: args.watch || args.w,
            junit: args.junit || args.j
          }),
          function (exitCode) {
            console.log('Karma has exited with ' + exitCode)

            if (expressServer) {
              expressServer.close()
            }

            if (exitCode === 0) {
              resolve(exitCode)
            } else {
              reject(exitCode)
            }
          })

        karmaServer.start()
      })
    })
}
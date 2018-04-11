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
        '--junit [filename], -j [filename]': 'output JUnit-style XML test report'
      }
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
          generateKarmaConfig({
            optionsForThisPlugin,
            webpackConfig: webpackConfigForTests,
            watch: args.watch || args.w,
            junit: args.junit || args.j
          }),
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
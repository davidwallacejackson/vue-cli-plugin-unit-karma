// pluginOptions.karma
module.exports = {
  /**
   * Files containing tests. These will be preprocessed with webpack and
   * then loaded into karma.
   */
  files: [
    'tests/**/*.spec.js',
    'tests/**/*.spec.ts',
  ],

  /**
   * Takes an object with `serverPort` and `extensions` keys, per karma-express-server:
   * https://github.com/coreyferguson/karma-express-server
   * 
   * NOTE: the documentation incorrectly specifies `port` as the name for
   * the port config key -- it's actually `serverPort`.
   * 
   * You can use this to start up a second HTTP server during tests -- for
   * instance, to serve mock data.
   */
  expressServer: undefined,

  /**
   * If provided, this will be merged into the base karma config for
   * the plugin.
   * 
   * See: https://github.com/webpack-contrib/karma-webpack and
   * http://karma-runner.github.io/2.0/config/configuration-file.html
   */
  karmaConfig: undefined
}
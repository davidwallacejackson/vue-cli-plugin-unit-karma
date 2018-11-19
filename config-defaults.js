// pluginOptions.karma
module.exports = {
  /**
   * Files containing tests. These will be preprocessed with webpack and
   * then loaded into karma.
   */
  files: [
    'tests/unit/**/*.spec.js',
    'tests/unit/**/*.spec.ts',
  ],

  /**
   * Takes an object with keys `port` (a Number) and `setup` (a function
   * taking an express App object). You can use this to set up an
   * Express server that will run alongside your tests.
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

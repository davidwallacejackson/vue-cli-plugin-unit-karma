# vue-cli-plugin-unit-karma
Run unit tests in a @vue/cli project with Karma

## Install
```bash
vue add vue-cli-plugin-unit-karma
```

## Usage

The plugin registers a `vue-cli-service test` command, like the base test runners that come with @vue/cli. By default, it'll run everything in `/tests/unit/` that ends in `.spec.js` or `.spec.ts`.

Command-line options include:
* `--watch, -w`: run in watch mode
* `--junit [dirname], -j [dirname]`: output JUnit-style XML test reports for each browser

If you needto configure the tests, you can add `pluginOptions.karma` to your `vue.config.js`, or to the `"vue"` key in package.json. See [this file](https://github.com/davidwallacejackson/vue-cli-plugin-unit-karma/blob/master/config-defaults.js) for config options.

NOTE: If you need to override specific settings in Karma itself, you can use the `pluginOptions.karma.karmaConfig` key. The contents will be merged into the plugin's own karma config, but be careful: if you include arrays or objects, they will *completely replace* the plugin's own settings for the corresponding key.

## Contributing

Pull requests and issues are welcome. To use the plugin locally:

1. Clone this repo.
2. Run `npm link` from the repo
3. Run `npm link vue-cli-plugin-unit-karma` from a @vue/cli project.

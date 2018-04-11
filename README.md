# vue-cli-plugin-unit-karma
Run unit tests in a @vue/cli project with Karma

## Install
```bash
vue add vue-cli-plugin-unit-karma
```

The plugin registers a `vue-cli-service test` command, like the base test runners that come with @vue/cli. By default, it'll run everything in `/tests/unit/` that ends in `.spec.js` or `.spec.ts`.

You can configure it by adding `pluginOptions.karma` to your `vue.config.js`, or to the `"vue"` key in package.json. See [this file](https://github.com/davidwallacejackson/vue-cli-plugin-unit-karma/blob/master/config-defaults.js) for config options.

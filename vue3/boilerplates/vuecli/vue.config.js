const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      // option: default // description
      disableMainProcessTypescript: false, // Manually disable typescript plugin for main process. Enable if you want to use regular js for the main process (src/background.js by default).
      mainProcessTypeChecking: false // Manually enable type checking during webpack bundling for background file.
    }
  }
})

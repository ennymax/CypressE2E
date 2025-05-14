/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */
/* eslint n/no-process-env: 0 */

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    animationDistanceThreshold: 5,
    baseUrl: 'https://ecommerce-playground.lambdatest.io',
    env: {
      apiBaseUrl: 'https://jsonplaceholder.typicode.com',
    },
    chromeWebSecurity: false,
    defaultCommandTimeout: 20_000,
    delay: 0,
    experimentalStudio: true,
    failOnStatusCode: false,
    requestTimeout: 6_000,
    responseTimeout: 6_000,
    retries: { openMode: 0, runMode: 0 },
    setupNodeEvents(on, _config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--incognito');
        }

        return launchOptions;
      });
    },
    snapshotOnly: true,
    testIsolation: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    waitForAnimations: true,
    watchForFileChanges: false,
    numTestsKeptInMemory: 0,

  },
  projectId: 'o52xg2',
});

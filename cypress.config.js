/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */
/* eslint n/no-process-env: 0 */

const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    animationDistanceThreshold: 5,
    baseUrl: 'https://www.automationexercise.com',
    chromeWebSecurity: false,
    defaultCommandTimeout: 10_000,
    delay: 0,
    env: {
      ...process.env,
      adminPassword: 'password123',
      adminUsername: 'admin',
      apiBaseUrl: 'https://restful-booker.herokuapp.com',

      password: '123456',
      username: 'qat@mailinator.com',
    },
    experimentalStudio: true,
    failOnStatusCode: false,
    requestTimeout: 6_000,
    responseTimeout: 6_000,
    retries: { openMode: 0, runMode: 0 },
    setupNodeEvents(on, _config) {},
    snapshotOnly: true,
    testIsolation: false,
    viewportHeight: 860,
    viewportWidth: 1_220,
    waitForAnimations: true,
    watchForFileChanges: false,
  },
  projectId: 'o52xg2',
});

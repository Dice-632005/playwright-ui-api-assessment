// @ts-check
import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['monocart-reporter', { name: 'Playwright Monocart Report', outputFile: './monocart-report/sauceDemoMonocartReport.html' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://www.saucedemo.com',
    /* Configure custom test ID attribute used by SauceDemo ([data-test="..."]) */
    testIdAttribute: 'data-test',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers and API */
  projects: [
    {
      name: 'api',
      testMatch: 'tests/api/**/*.spec.js',
      use: {
        baseURL: 'https://restful-booker.herokuapp.com',
      },
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: 'tests/api/**/*.spec.js',
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: 'tests/api/**/*.spec.js',
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: 'tests/api/**/*.spec.js',
    },
  ],
});


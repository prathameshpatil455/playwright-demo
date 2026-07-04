import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  grep: /@demo/,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: {
    ...devices['Desktop Chrome'],
    headless: false,
    launchOptions: {
      slowMo: 1000,
    },
    trace: 'off',
    screenshot: 'off',
    video: 'off',
  },
  projects: [{ name: 'demo' }],
});

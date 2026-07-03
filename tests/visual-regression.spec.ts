import { test, expect } from '@playwright/test';

test.describe('Visual Regression Testing', () => {
  test('captures a baseline screenshot of the login form', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Visual regression runs on Chromium only');

    await page.goto('https://the-internet.herokuapp.com/login');
    await expect(page.getByRole('heading', { level: 2 })).toHaveText('Login Page');

    await expect(page.locator('#login')).toHaveScreenshot('login-form.png', {
      maxDiffPixelRatio: 0.01,
    });
  });
});

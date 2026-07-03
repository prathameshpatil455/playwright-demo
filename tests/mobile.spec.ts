import { test, expect } from '@playwright/test';

test.describe('Mobile Emulation', () => {
  test('renders correctly on a mobile viewport', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chrome', 'Mobile-only test');

    await page.goto('https://the-internet.herokuapp.com');

    const viewport = page.viewportSize();
    expect(viewport?.width).toBeLessThanOrEqual(390);

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Welcome to the-internet');
    await expect(page.getByRole('link', { name: 'Form Authentication' })).toBeVisible();
  });
});

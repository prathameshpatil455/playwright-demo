import { test, expect } from '@playwright/test';

test.describe('Handling Popups & New Tabs', () => {
  test('captures a new tab and asserts content on it', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');

    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Click Here' }).click();
    const popup = await popupPromise;

    await popup.waitForLoadState();
    await expect(popup).toHaveURL(/\/windows\/new/);
    await expect(popup.getByRole('heading', { level: 3 })).toHaveText('New Window');
    await expect(popup.locator('h3')).toHaveText('New Window');

    await popup.close();
  });
});

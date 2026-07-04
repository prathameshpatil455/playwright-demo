import { test, expect } from '@playwright/test';

test.describe('Dynamic Loading', () => {
  test('waits for dynamically loaded content without manual sleep', { tag: '@demo' }, async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    await page.getByRole('button', { name: 'Start' }).click();

    await expect(page.locator('#finish')).toHaveText('Hello World!', { timeout: 15_000 });
  });

  test('waits for element rendered after page load', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');

    await page.getByRole('button', { name: 'Start' }).click();

    await expect(page.getByText('Hello World!')).toBeVisible({ timeout: 15_000 });
  });
});

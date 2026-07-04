import { test, expect } from '@playwright/test';

test.describe('Browser Navigation', () => {
  test('navigates back, forward, and refreshes the page', { tag: '@demo' }, async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Welcome to the-internet');

    await page.getByRole('link', { name: 'Form Authentication' }).click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('heading', { level: 2 })).toHaveText('Login Page');

    await page.goBack();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Welcome to the-internet');

    await page.goForward();
    await expect(page).toHaveURL(/\/login$/);

    await page.reload();
    await expect(page.getByRole('heading', { level: 2 })).toHaveText('Login Page');
  });
});

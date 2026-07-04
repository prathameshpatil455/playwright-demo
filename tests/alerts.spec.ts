import { test, expect } from '@playwright/test';

const BASE_URL = 'https://the-internet.herokuapp.com/javascript_alerts';

test.describe('Handling Alerts & Dialogs', () => {
  test('accepts a JS alert and reads its message', { tag: '@demo' }, async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('I am a JS Alert');
      await dialog.accept();
    });

    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
  });

  test('accepts a JS confirm dialog', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('I am a JS Confirm');
      await dialog.accept();
    });

    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.locator('#result')).toHaveText('You clicked: Ok');
  });

  test('dismisses a JS confirm dialog', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      await dialog.dismiss();
    });

    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
  });

  test('handles a JS prompt with custom input', async ({ page }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('prompt');
      expect(dialog.message()).toBe('I am a JS prompt');
      expect(dialog.defaultValue()).toBe('');
      await dialog.accept('Playwright');
    });

    await page.goto(BASE_URL);
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(page.locator('#result')).toHaveText('You entered: Playwright');
  });
});

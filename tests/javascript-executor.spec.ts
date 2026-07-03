import { test, expect } from '@playwright/test';

test.describe('JavaScript Executor', () => {
  test('scrolls the page and reads scroll position via evaluate', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/large');

    const scrollBefore = await page.evaluate(() => window.scrollY);
    expect(scrollBefore).toBe(0);

    await page.evaluate(() => window.scrollTo(0, 500));
    const scrollAfter = await page.evaluate(() => window.scrollY);
    expect(scrollAfter).toBeGreaterThanOrEqual(500);
  });

  test('moves a range slider using keyboard interaction', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/horizontal_slider');

    const slider = page.locator('input[type="range"]');
    await slider.focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');

    const value = await slider.inputValue();
    expect(Number(value)).toBeGreaterThan(0);
  });
});

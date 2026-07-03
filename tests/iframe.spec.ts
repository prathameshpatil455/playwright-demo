import { test, expect } from '@playwright/test';

test.describe('iFrame Interaction', () => {
  test('locates and reads content inside nested iframes', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/nested_frames');

    const leftFrame = page
      .frameLocator('frame[name="frame-top"]')
      .frameLocator('frame[name="frame-left"]');
    const middleFrame = page
      .frameLocator('frame[name="frame-top"]')
      .frameLocator('frame[name="frame-middle"]');

    await expect(leftFrame.locator('body')).toHaveText('LEFT');
    await expect(middleFrame.locator('body')).toHaveText('MIDDLE');

    await middleFrame.locator('body').click();
    await expect(middleFrame.locator('body')).toBeVisible();
  });
});

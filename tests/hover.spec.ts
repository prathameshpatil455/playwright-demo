import { test, expect } from '@playwright/test';

test.describe('Hover & Tooltips', () => {
  test('reveals user info on hover', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');

    const user1 = page.locator('.figure').first();
    await user1.hover();

    const caption = user1.locator('.figcaption');
    await expect(caption).toBeVisible();
    await expect(caption).toContainText('name: user1');
    await expect(caption.getByRole('link', { name: 'profile' })).toBeVisible();
  });
});

test.describe('Keyboard & Mouse Actions', () => {
  test('performs right-click and asserts context menu', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/context_menu');

    await page.locator('#hot-spot').click({ button: 'right' });
    await expect(page.locator('#hot-spot')).toBeVisible();
  });

  test('double-clicks a button and verifies the confirmation message', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    await page.getByRole('button', { name: 'Double Click Me' }).waitFor({ state: 'visible' });

    await page.getByRole('button', { name: 'Double Click Me' }).dblclick();
    await expect(page.locator('#doubleClickMessage')).toHaveText('You have done a double click');
  });

  test('uses keyboard shortcuts to select text', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');

    await page.locator('body').click();
    await page.keyboard.press('a');
    await expect(page.locator('#result')).toHaveText('You entered: A');

    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toHaveText('You entered: ENTER');
  });
});

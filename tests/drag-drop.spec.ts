import { test, expect } from '@playwright/test';

test.describe('Drag and Drop', () => {
  test('drags an element from one column to another', { tag: '@demo' }, async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

    const source = page.locator('#column-a');
    const target = page.locator('#column-b');

    await expect(source).toContainText('A');
    await expect(target).toContainText('B');

    await source.dragTo(target);

    await expect(source).toContainText('B');
    await expect(target).toContainText('A');
  });
});

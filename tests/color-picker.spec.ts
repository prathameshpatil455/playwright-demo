import { test, expect } from '@playwright/test';

test.describe('HTML5 Color Picker', () => {
  test('sets a color value on an HTML5 color input', async ({ page }) => {
    await page.setContent(`
      <label for="picker">Pick a color</label>
      <input type="color" id="picker" value="#ff0000" />
      <p id="value"></p>
      <script>
        const picker = document.getElementById('picker');
        const value = document.getElementById('value');
        value.textContent = picker.value;
        picker.addEventListener('input', () => {
          value.textContent = picker.value;
        });
      </script>
    `);

    const picker = page.locator('#picker');
    await picker.fill('#00aaff');
    await expect(page.locator('#value')).toHaveText('#00aaff');
  });
});

import { test, expect } from '@playwright/test';

test.describe('Link Identification', () => {
  test('retrieves all hyperlinks and validates their text and URLs', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com');

    const links = page.locator('#content li a');
    await expect(links.first()).toBeVisible();

    const count = await links.count();
    expect(count).toBeGreaterThan(10);

    const firstLink = links.first();
    const text = await firstLink.innerText();
    const href = await firstLink.getAttribute('href');

    expect(text.length).toBeGreaterThan(0);
    expect(href).toBeTruthy();

    const allHrefs: string[] = [];
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      if (href) allHrefs.push(href);
    }

    expect(allHrefs).toContain('/login');
    expect(allHrefs).toContain('/upload');
    expect(allHrefs).toContain('/dynamic_loading');
  });
});

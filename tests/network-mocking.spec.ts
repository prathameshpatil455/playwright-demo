import { test, expect } from '@playwright/test';

test.describe('Network Interception / Mocking', () => {
  test('mocks an API response with page.route()', { tag: '@demo' }, async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts/1', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 1,
          title: 'Mocked by Playwright',
          body: 'This response was intercepted and replaced.',
        }),
      });
    });

    await page.goto(
      'data:text/html,<body><pre id="output"></pre><script>fetch("https://jsonplaceholder.typicode.com/posts/1").then(r=>r.json()).then(d=>document.getElementById("output").textContent=JSON.stringify(d))</script>'
    );

    await expect(page.locator('#output')).toContainText('Mocked by Playwright');
    await expect(page.locator('#output')).not.toContainText('sunt aut facere');
  });

  test('simulates a failed API request', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts/1', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await page.goto(
      'data:text/html,<body><div id="status"></div><script>fetch("https://jsonplaceholder.typicode.com/posts/1").then(r=>{document.getElementById("status").textContent=r.status}).catch(()=>document.getElementById("status").textContent="failed")</script>'
    );

    await expect(page.locator('#status')).toHaveText('500');
  });

  test('simulates slow network with delayed route', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts/1', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await route.continue();
    });

    const start = Date.now();
    await page.goto(
      'data:text/html,<body><div id="done">loading</div><script>fetch("https://jsonplaceholder.typicode.com/posts/1").then(()=>document.getElementById("done").textContent="done")</script>'
    );
    await expect(page.locator('#done')).toHaveText('done');
    expect(Date.now() - start).toBeGreaterThanOrEqual(1400);
  });
});

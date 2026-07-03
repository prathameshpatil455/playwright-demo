import { test, expect } from '@playwright/test';

test.describe('API Testing', () => {
  test('fetches a post via request context without a browser', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject({
      id: 1,
      userId: 1,
    });
    expect(body.title).toBeTruthy();
    expect(body.body).toBeTruthy();
  });

  test('creates a new post via POST request', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'Playwright API Test',
        body: 'Created via Playwright request context',
        userId: 1,
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.title).toBe('Playwright API Test');
    expect(body.id).toBeTruthy();
  });

  test('validates response headers', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users');

    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/json');

    const users = await response.json();
    expect(users).toHaveLength(10);
  });
});

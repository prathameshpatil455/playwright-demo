import path from 'path';
import { test, expect } from '@playwright/test';

const UPLOAD_FILE = path.join(__dirname, '../fixtures/sample-upload.txt');

test.describe('File Upload', () => {
  test('uploads a file and verifies the filename on the page', { tag: '@demo' }, async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');

    await page.locator('#file-upload').setInputFiles(UPLOAD_FILE);
    await page.getByRole('button', { name: 'Upload' }).click();

    await expect(page.locator('#uploaded-files')).toHaveText('sample-upload.txt');
  });
});

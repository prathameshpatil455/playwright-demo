import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';

test.describe('File Download', () => {
  test('captures a download and verifies the saved file', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'some-file.txt' }).click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toBe('some-file.txt');

    const savePath = path.join(test.info().outputDir, download.suggestedFilename());
    await download.saveAs(savePath);

    expect(fs.existsSync(savePath)).toBe(true);
    const content = fs.readFileSync(savePath, 'utf-8');
    expect(content.length).toBeGreaterThan(0);
  });
});

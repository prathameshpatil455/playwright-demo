import { test, expect } from '@playwright/test';

const FORM_URL = 'https://demoqa.com/automation-practice-form';

test.describe('Auto Form Filling', () => {
  test.describe.configure({ timeout: 60_000 });

  test.beforeEach(async ({ page }) => {
    await page.goto(FORM_URL, { waitUntil: 'domcontentloaded' });
    await expect(page.getByPlaceholder('First Name')).toBeVisible();
  });

  test('fills multi-field form and submits successfully', { tag: '@demo' }, async ({ page }) => {
    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('name@example.com').fill('john.doe@example.com');
    await page.getByLabel('Male', { exact: true }).check();
    await page.getByPlaceholder('Mobile Number').fill('9876543210');

    await page.locator('#dateOfBirthInput').click();
    await page.locator('.react-datepicker__month-select').selectOption('March');
    await page.locator('.react-datepicker__year-select').selectOption('1995');
    await page
      .locator('.react-datepicker__day:not(.react-datepicker__day--outside-month)')
      .first()
      .click();

    await page.getByLabel('Sports').check();
    await page.getByLabel('Reading').check();
    await page.getByPlaceholder('Current Address').fill('123 Main Street, Bangalore');

    await page.locator('#state').click();
    await page.getByRole('option', { name: 'NCR' }).click();
    await page.locator('#city').click();
    await page.getByRole('option', { name: 'Delhi' }).click();

    await page.getByRole('button', { name: 'Submit' }).click();

    const modal = page.locator('.modal-content');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Thanks for submitting the form');
    await expect(modal).toContainText('John Doe');
    await expect(modal).toContainText('john.doe@example.com');
    await expect(modal).toContainText('Male');
    await expect(modal).toContainText('Sports, Reading');
  });
});

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.testarchitect.com/');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'Log in / Sign up' }).click();
  await page.getByRole('textbox', { name: 'Username or email address *' }).click();
  await page.getByRole('textbox', { name: 'Username or email address *' }).fill('nga.thuy.le@agest.vn');
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('nga.thuy.le');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('All departments').click();
  await page.getByRole('link', { name: ' Electronic Components &' }).click();
  await page.goto('https://demo.testarchitect.com/product-category/electronic-components-supplies/');
  await expect(page.locator('.switch-grid')).toBeVisible();
});
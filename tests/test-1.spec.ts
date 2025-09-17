import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.testarchitect.com/');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'Log in / Sign up' }).click();
  await page.getByRole('textbox', { name: 'Username or email address *' }).click();
});
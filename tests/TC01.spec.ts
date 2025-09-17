import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { DepartmentPage } from '../page-objects/department-page';

test('Verify users can buy an item successfully', async ({ page }) => {

  const popupCloseButton = page.locator('div.popmake').getByRole('button', { name: 'Close' });
  const loginLink = page.getByRole('link', { name: 'Log in / Sign up' });
  const loginPage = new LoginPage(page);
  const departmentPage = new DepartmentPage(page);
  
  // 1. Open browser and go to https://demo.testarchitect.com/
  await page.goto('https://demo.testarchitect.com/');
  await popupCloseButton.click();

  // 2. Login with valid credential
  await loginLink.click();
  await loginPage.login('nga.thuy.le@agest.vn', 'nga.thuy.le');

  // 3. Navigate to All departments section
  // 4. Select Electronic Components & Supplies
  await loginPage.gotoDepartment('Electronic Components & Supplies');

  // 5. Verify the items should be displayed as a grid
  await departmentPage.checkViewModeSelected("list");

  // 6. Switch view to list
  await departmentPage.switchView("list");

  // 7. Verify the items should be displayed as a list
  // 8. Select any item randomly to purchase
  // 9. Click 'Add to Cart'
  await departmentPage.addRandomProductToCart();

  // 10. Go to the cart 
  await departmentPage.gotoCart();

  // 11. Verify item details in mini content
  await page.pause()
});
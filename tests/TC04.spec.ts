import { test } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { ShopPage } from '../page-objects/shop-page';
import { CartPage } from '../page-objects/cart-page';
import { HomePage } from '../page-objects/home-page';
import { SortMethod } from '../data-objects/sort-methods';


test('Verify users can sort items by price', async ({ page }) => {
  const homePage = new HomePage(page)
  const loginPage = new LoginPage(page);
  const shopPage = new ShopPage(page);
  const cartPage = new CartPage(page);

  // 1. Open browser and go to https://demo.testarchitect.com/
  // 2. Login with valid credentials 
  await homePage.goToLogin();
  await loginPage.submitlogin('nga.thuy.le@agest.vn', 'nga.thuy.le');

  // 3. Go to Shop page
  await loginPage.gotoShop();
  await page.pause();
   
  // 4.  Switch view to list
  await shopPage.switchView("list");

  // 5. Sort items by price (low to high / high to low)
  await shopPage.sortItems(SortMethod.PriceLowToHigh);
  
});
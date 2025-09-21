import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { ShopPage } from '../page-objects/shop-page';
import { CartPage } from '../page-objects/cart-page';
import { HomePage } from '../page-objects/home-page';

test('Verify users can clear the cart', async ({ page }) => {
  const homePage = new HomePage(page);
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
  await shopPage.addToCartMultipleItems(["Bose SoundLink Mini", "HP LaserJet P1102 (CE651A)"]);
  await shopPage.gotoCart();
   
  // 4. Verify items show in table
  await cartPage.assertProductsInCart(["Bose SoundLink Mini", "HP LaserJet P1102 (CE651A)"]);
  
  // 5. Click on Clear shopping cart
  await cartPage.clickClearCart();

});
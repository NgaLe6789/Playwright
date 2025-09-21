import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { ShopPage } from '../page-objects/shop-page';
import { CartPage } from '../page-objects/cart-page';
import { CheckoutPage } from '../page-objects/checkout-page';
import { HomePage } from '../page-objects/home-page';
import { ProductPage } from '../page-objects/product-page';

test('Verify users can post a review', async ({ page }) => {
  const homePage = new HomePage(page)
  const loginPage = new LoginPage(page);
  const shopPage = new ShopPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const productPage = new ProductPage(page);

  // 1. Open browser and go to https://demo.testarchitect.com/
  // 2. Login with valid credentials 
  await homePage.goToLogin();
  await loginPage.submitlogin('nga.thuy.le@agest.vn', 'nga.thuy.le');

  // 3. Go to Shop page
  await loginPage.gotoShop();
   
  // 4. Click on a product to view detail
  await shopPage.clickAProduct('Bose SoundLink Mini');

  // 5. Scroll down then click on REVIEWS tab
  await productPage.clickTab('Reviews');

  // 6. Submit a review
  await productPage.submitReview('4', 'good');

});
import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { ShopPage } from '../page-objects/shop-page';
import { CartPage } from '../page-objects/cart-page';
import { CheckoutPage } from '../page-objects/checkout-page';
import { PaymentMethod } from '../data-objects/payment-method';
import { OrderStatusPage } from '../page-objects/oder-status-page';

test('Verify users can buy multiple item successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const shopPage = new ShopPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const oderStatusPage = new OrderStatusPage(page);
  const billingDetails = {
      firstName: 'Nga',
      lastName: 'Le',
      company: 'AGEST',
      country: 'Vietnam',
      address1: '253 hoang van thu',
      address2: '253 hoang van thu',
      zipcode: '22222',
      city: 'HCM',
      phone: '+123456789',
      email: 'nga.thuy.le@agest.vn',
      odernote: 'NA',
}

  // 1. Open browser and go to https://demo.testarchitect.com/
  // 2. Login with valid credentials 
  await loginPage.login('nga.thuy.le@agest.vn', 'nga.thuy.le');

  // 3. Go to Shop page
  await loginPage.gotoShop();
   
  // 4. Select multiple items and add to cart
  await shopPage.addToCartMultipleItems(["Bose SoundLink Mini", "HP LaserJet P1102 (CE651A)"]);

  // 5. Go to the cart and verify all selected items
  await shopPage.gotoCart();
  await cartPage.assertProductsInCart(["Bose SoundLink Mini", "HP LaserJet P1102 (CE651A)"]);

  // 6. Proceed to checkout and confirm order
  await cartPage.clickToCheckout();
  await checkoutPage.fillBillingForm(billingDetails, PaymentMethod.CP);
  await checkoutPage.placeOrder();

  // 7. Verify order confirmation message
  await oderStatusPage.assertPageDisplayed();
  await page.pause();
  
});
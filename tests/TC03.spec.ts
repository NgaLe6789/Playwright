import { expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { ShopPage } from '../page-objects/shop-page';
import { CartPage } from '../page-objects/cart-page';
import { CheckoutPage } from '../page-objects/checkout-page';
import { PaymentMethod } from '../data-objects/payment-method';
import { OrderStatusPage } from '../page-objects/oder-status-page';
import { HomePage } from '../page-objects/home-page';
import { test } from '../fixtures/my-fixtures';
import { UserAccount } from '../data-objects/user-account';

test('Verify users can buy an item using different payment methods (all payment methods)', async ({ page, clearCart }) => {
  const homePage = new HomePage(page)
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
  await homePage.goToLogin();
  await loginPage.submitlogin(UserAccount.username, UserAccount.password);
  await clearCart();

  // 3. Go to Shop page
  await loginPage.gotoShop();

  // 4. Select an item and add to cart
  await shopPage.addToCartAnItem("RoboXplorer Robotic");

  // 5. Go to Checkout page
  await shopPage.gotoCart();
  await cartPage.clickToCheckout();

  // 6.Choose a different payment method (Direct bank transfer, Cash on delivery)
  await checkoutPage.fillBillingForm(billingDetails, PaymentMethod.COD);

  // 7. Complete the payment process
  await checkoutPage.placeOrder();

  // 8. Verify order confirmation message
  await oderStatusPage.checkPageDisplayed();

});
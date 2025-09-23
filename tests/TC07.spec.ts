import { test, expect } from '@playwright/test';
import { ShopPage } from '../page-objects/shop-page';
import { CartPage } from '../page-objects/cart-page';
import { CheckoutPage } from '../page-objects/checkout-page';
import { PaymentMethod } from '../data-objects/payment-method';
import { HomePage } from '../page-objects/home-page';

test('Ensure proper error handling when mandatory fields are blank', async ({ page }) => {
  const homePage = new HomePage(page)
  const shopPage = new ShopPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const billingDetails = {
    firstName: 'Nga',
    lastName: 'Le',
    company: 'AGEST',
    country: 'Vietnam',
    address1: '',
    address2: '',
    zipcode: '22222',
    city: 'HCM',
    phone: '+123456789',
    email: '',
    odernote: 'NA',
  }

  // User is at checkout
  await homePage.lauchPage();
  await homePage.gotoShop();
  await shopPage.addToCartAnItem("DJI Mavic Pro Camera Drone");
  await shopPage.gotoCart();
  await cartPage.clickToCheckout();

  // 1. Leave mandatory fields (address, payment info) blank
  await checkoutPage.fillBillingForm(billingDetails, PaymentMethod.BT);

  //  2. Click 'Confirm Order'
  await checkoutPage.placeOrder();

  //  3. Verify error messages
  await checkoutPage.checkFailedOrder(billingDetails);

});
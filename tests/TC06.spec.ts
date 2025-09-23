import { test, expect } from '@playwright/test';
import { ShopPage } from '../page-objects/shop-page';
import { CartPage } from '../page-objects/cart-page';
import { CheckoutPage } from '../page-objects/checkout-page';
import { PaymentMethod } from '../data-objects/payment-method';
import { OrderStatusPage } from '../page-objects/oder-status-page';
import { HomePage } from '../page-objects/home-page';

test('Verify users try to buy an item without logging in (As a guest)', async ({ page }) => {
  const homePage = new HomePage(page)
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
  await homePage.lauchPage();

  // 2. Navigate to 'Shop' or 'Products' section
  await homePage.gotoShop();

  // 3. Add a product to cart
  await shopPage.addToCartAnItem("Velleman Vertex K 8400");

  // 4. Click on Cart button
  await shopPage.gotoCart();

  // 5. Proceed to complete order
  await cartPage.clickToCheckout();
  await checkoutPage.fillBillingForm(billingDetails, PaymentMethod.BT);
  await checkoutPage.placeOrder();
  await oderStatusPage.checkPageDisplayed();

});
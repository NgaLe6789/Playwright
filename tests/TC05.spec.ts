import { expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { ShopPage } from '../page-objects/shop-page';
import { CartPage } from '../page-objects/cart-page';
import { CheckoutPage } from '../page-objects/checkout-page';
import { PaymentMethod } from '../data-objects/payment-method';
import { OrderStatusPage } from '../page-objects/oder-status-page';
import { HomePage } from '../page-objects/home-page';
import { test } from '../fixtures/my-fixtures';
import { MyAccountPage } from '../page-objects/myAccount-page';
import { UserAccount } from '../data-objects/user-account';

test('Verify orders appear in order history', async ({ page, clearCart }) => {
  const homePage = new HomePage(page)
  const loginPage = new LoginPage(page);
  const shopPage = new ShopPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const myAccountPage = new MyAccountPage(page);
  const orderStatusPage = new OrderStatusPage(page);
  const billingDetails1 = {
    firstName: 'Nga1',
    lastName: 'Le1',
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

  const billingDetails2 = {
    firstName: 'Nga2',
    lastName: 'Le2',
    company: 'AGEST',
    country: 'Vietnam',
    address1: '500 hoang van thu',
    address2: '500 hoang van thu',
    zipcode: '22222',
    city: 'HCM',
    phone: '+123456789',
    email: 'nga.thuy.le@agest.vn',
    odernote: 'NA',
  }
  await homePage.goToLogin();
  await loginPage.submitlogin(UserAccount.username, UserAccount.password);
  await clearCart();

  // Oder 1
  await loginPage.gotoShop();
  await shopPage.addToCartAnItem("RoboXplorer Robotic");
  await shopPage.gotoCart();
  await cartPage.clickToCheckout();
  await checkoutPage.fillBillingForm(billingDetails1, PaymentMethod.COD);
  await checkoutPage.placeOrder();
  let orderNmber1 = await orderStatusPage.getOrderNumber();
  // Oder 2
  await checkoutPage.gotoShop();
  await shopPage.addToCartAnItem("RoboXplorer Robotic");
  await shopPage.gotoCart();
  await cartPage.clickToCheckout();
  await checkoutPage.fillBillingForm(billingDetails2, PaymentMethod.COD);
  await checkoutPage.placeOrder();
  let orderNmber2 = await orderStatusPage.getOrderNumber();

  // 1. Go to My Account page
  await checkoutPage.gotoMyAccount();

  // 2. Click on Orders in left navigation
  await myAccountPage.clickOrders();

  // 3. Verify order details
  await myAccountPage.checkOrderDetails(orderNmber1, billingDetails1);
  await myAccountPage.checkOrderDetails(orderNmber2, billingDetails2);

});
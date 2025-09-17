import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { DepartmentPage } from '../page-objects/department-page';
import { CartPage } from '../page-objects/cart-page';
import { CheckoutPage } from '../page-objects/checkout-page';
import { PaymentMethod } from '../data-objects/payment-method';
import { OrderStatusPage } from '../page-objects/oder-status-page';

test('Verify users can buy an item successfully', async ({ page }) => {

  const popupCloseButton = page.locator('div.popmake').getByRole('button', { name: 'Close' });
  const loginLink = page.getByRole('link', { name: 'Log in / Sign up' });
  const loginPage = new LoginPage(page);
  const departmentPage = new DepartmentPage(page);
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
  const addedProduct = await departmentPage.addRandomProductToCart();
  await page.waitForTimeout(1000);

  // 10. Go to the cart 
  await departmentPage.gotoCart();
  
  // 11. Verify item details in mini content
  await cartPage.assertFirstProductInCart(addedProduct);

  // 12. Click on Checkout
  await cartPage.clickToCheckout();


  // 13. Verify Checkbout page displays
  await checkoutPage.assertCheckoutPageDisplayed();
  
  
  // 14. Verify item details in order
  // 15. Fill the billing details with default payment method
  await checkoutPage.fillBillingForm(billingDetails, PaymentMethod.CP);
  
  // 16. Click on PLACE ORDER
  await checkoutPage.placeOrder();

  // 17. Verify Order status page displays
  await oderStatusPage.assertPageDisplayed();

  // 18. Verify the Order details with billing and item information
  await oderStatusPage.assertOrderDetails(billingDetails.email, PaymentMethod.CP);

  
});
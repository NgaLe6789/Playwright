import { expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { ShopPage } from '../page-objects/shop-page';
import { CartPage } from '../page-objects/cart-page';
import { HomePage } from '../page-objects/home-page';
import { test} from '../fixtures/my-fixtures';
import { Product } from "../data-objects/product";

test('Verify users can update quantity of product in cart', async ({ page, clearCart }) => {
  const homePage = new HomePage(page)
  const loginPage = new LoginPage(page);
  const shopPage = new ShopPage(page);
  const cartPage = new CartPage(page);
  const product: Product = {
    category: '',
    title: 'Bose SoundLink Mini',
    price: 599.00,
}

  // 1. Open browser and go to https://demo.testarchitect.com/
  // 2. Login with valid credentials 
  await homePage.goToLogin();
  await loginPage.submitlogin('nga.thuy.le@agest.vn', 'nga.thuy.le');
  await clearCart();

  // 3. Go to Shop page
  await loginPage.gotoShop();
   
  // 4. Add a product
  await shopPage.addToCartAnItem(product.title);

  // 5. Go to the cart
  await shopPage.gotoCart();

  // 6. Verify quantity of added product
  await cartPage.assertQuantityProduct(product.title, 1);

  // 7. Click on Plus(+) button
  await cartPage.clickPlusQuantity(product.title);

  // 8. Verify quantity of product and SUB TOTAL price
  await cartPage.assertQuantityProduct(product.title, 2);
  await cartPage.assertSubTotal(product.title, product.price*2);

  // 9. Enter 4 into quantity textbox then click on UPDATE CART button
  await cartPage.fillQuanlity(product.title, 2);

  // 10. Verify quantity of product is 4 and SUB TOTAL price
  await cartPage.assertQuantityProduct(product.title, 4);
  await cartPage.assertSubTotal(product.title, product.price*4);
  
  // 11. Click on Minus(-) button
  await cartPage.clickMinusQuantity(product.title);

  // 12. Verify quantity of product and SUB TOTAL price
  await cartPage.assertQuantityProduct(product.title, 3);
  await cartPage.assertSubTotal(product.title, product.price*3);

});
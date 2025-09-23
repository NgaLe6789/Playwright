import { test as baseTest } from '@playwright/test';
import { CartPage } from '../page-objects/cart-page';
import { HomePage } from '../page-objects/home-page';

type MyFixtures = {
  clearCart: () => Promise<void>;
};

export const test = baseTest.extend<MyFixtures>({
  clearCart: async ({ page }, use) => {
    await use(async () => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    await homePage.gotoCart();
    await cartPage.clearAllProducts();
     });
  },
});
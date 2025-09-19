import { expect, Page, Locator} from '@playwright/test';
import { BasePage } from './base-page';
import { Product } from "../data-objects/product";

export class CartPage extends BasePage {
    private readonly checkoutButton: Locator;
    private readonly clearShoppingCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.getByRole('link', { name: 'PROCEED TO CHECKOUT' });
        this.clearShoppingCartButton= page.getByText('Clear shopping cart');
    }

    async assertFirstProductInCart(firstProduct: Product) {

        const firstRow = this.page.getByRole('row').filter({ has: this.page.getByRole('link', { name: 'Remove'})}).nth(0);
        const actualName = await firstRow.getByRole('link').nth(1).innerText();;
        const priceText = await firstRow.getByRole('cell').nth(2).innerText();
        const actualPrice = parseFloat(priceText.replace(/[^0-9.-]+/g, ''));
        const quantityText = await firstRow.getByRole('spinbutton').inputValue();
        const actualQuantity = parseInt(quantityText, 10);
        
        //expect(actualName).toBe(firstProduct.title);
        //expect(actualPrice).toBe(firstProduct.price);
        expect(actualQuantity).toBe(1);
    }

    async clickToCheckout() {
        await this.checkoutButton.click();
    }

    async assertProductsInCart(items: string[]) {
        for (let i = 0; i < items.length; i++) {
            await expect(this.page.getByRole('row').filter({ has: this.page.getByRole('link', { name: 'Remove'})}).filter({ hasText: items[i] })).toBeVisible();
        }
    }

    async clearCart() {
        await this.clearShoppingCartButton.click();
    }

}
import { expect, Page, Locator} from '@playwright/test';
import { BasePage } from './base-page';
import { Product } from "../data-objects/product";

export class CartPage extends BasePage {
    private readonly checkoutButton: Locator;
    private readonly clearShoppingCartButton: Locator;
    private readonly updateCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.getByRole('link', { name: 'PROCEED TO CHECKOUT' });
        this.clearShoppingCartButton= page.getByText('Clear shopping cart');
        this.updateCartButton = page.getByRole('button', { name: 'Update cart' });
    }

    async assertFirstProductInCart(firstProduct: Product) {

        const firstRow = this.page.getByRole('row').filter({ has: this.page.getByRole('link', { name: 'Remove'})}).nth(0);
        const actualName = await firstRow.getByRole('link').nth(1).innerText();;
        const priceText = await firstRow.getByRole('cell').nth(2).innerText();
        const actualPrice = parseFloat(priceText.replace(/[^0-9.-]+/g, ''));
        const quantityText = await firstRow.getByRole('spinbutton').inputValue();
        const actualQuantity = parseInt(quantityText, 10);
        expect(actualName).toBe(firstProduct.title);
        expect(actualPrice).toBe(firstProduct.price);
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

    async clearAllProducts() {
        await this.page.waitForLoadState('load');
        const removeButton = await this.page.getByRole('link', { name: 'Remove' });
        const removeNumber= await removeButton.count();
        for (let i = 0; i < removeNumber; i++) {
            await this.page.getByRole('link', { name: 'Remove' }).nth(0).click();
            await this.page.waitForLoadState('load');
        }        
    }

    async clickClearCart() {
        await this.clearShoppingCartButton.click();
    }

    async assertQuantityProduct(productName: string, quantity: number) {
        const quantityText = await (this.page.getByRole('spinbutton', { name: productName })).inputValue();
        const quantityNumber = parseInt(quantityText, 10);
        expect(quantityNumber).toBe(quantity);
    }

    async clickPlusQuantity(productName: string) {
        await this.page.waitForLoadState('load');
        await this.page.getByRole('cell', { name: ` ${productName}`}).locator('span').nth(1).click({timeout: 30_000});
        await this.page.waitForLoadState('load');
    }

        async clickMinusQuantity(productName: string) {
        await this.page.waitForLoadState('load');
        await this.page.getByRole('cell', { name: ` ${productName}`}).locator('span').nth(0).click({timeout: 30_000});
        await this.page.waitForLoadState('load');
    }

    async assertSubTotal(productName: string, price: number) {
        const priceText = await this.page.getByRole('row').filter({ has: this.page.getByRole('link', { name: 'Remove'})}).filter({ hasText: productName }).getByRole('cell').nth(4).innerText();
        const actualPrice = parseFloat(priceText.replace(/[^0-9.-]+/g, ''));
        expect(actualPrice).toBe(price);
    }

    async fillQuanlity(productName: string, quantity: number) {
        await this.page.getByRole('spinbutton', { name: 'Bose SoundLink Mini quantity' }).fill(quantity.toString());
        await this.updateCartButton.click();
        await this.page.waitForLoadState('load');
    }

}
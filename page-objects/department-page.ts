import { Page, Locator,expect}  from "@playwright/test";
import { BasePage } from "./base-page";
import { Product } from "../data-objects/product";
import { promises } from "dns";

export class DepartmentPage extends BasePage {
    private readonly gridViewIcon: Locator;
    private readonly listViewIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.gridViewIcon = page.locator('.switch-grid');
        this.listViewIcon = page.locator('.switch-list');
    }

    async checkViewModeSelected(type: 'grid' | 'list') {
        await expect(this.page.locator(`.switch-${type}`)).toHaveClass(/switcher-active/);
    }

    async switchView(type: 'grid' | 'list') {
        await this.page.locator(`.switch-${type}`).click();
    }

    async addRandomProductToCart(): Promise<Product>{
        const items = this.page.locator('.product');
        const randomItem = items.nth(Math.floor(Math.random() * await items.count()));
        const randomItemPrice = await randomItem.locator('span:not(.del)').and(randomItem.locator('.woocommerce-Price-amount')).innerText();

        const product: Product = {
            category: await randomItem.locator('.products-page-cats').innerText(),
            title: await randomItem.locator('.product-title').innerText(),
            price: Number(randomItemPrice.replace(/[^0-9.-]+/g, '')),
        }
        await randomItem.locator('.product-details a[href*="?add-to-cart"]').click();
        return product;
    }

}
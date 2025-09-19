import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ShopPage extends BasePage {


    constructor(page: Page) {
        super(page);
    }

    async addToCartMultipleItems(nameItems: string[]) {
        for (let i = 0; i < nameItems.length; i++) {
            await this.page.getByRole('link', { name: 'Add “' + nameItems[i] }).nth(1).click();    
            await this.page.waitForLoadState('load');
        };
    };

    async addToCartAnItem(nameItem: string) {
        await this.page.getByRole('link', { name: 'Add “' + nameItem }).nth(1).click();    
    };
}
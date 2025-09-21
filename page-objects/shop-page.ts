import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { SortMethod } from '../data-objects/sort-methods';

export class ShopPage extends BasePage {
    private readonly addedProductMessage: Locator;
    private readonly gridViewIcon: Locator;
    private readonly listViewIcon: Locator;
    private readonly sortCombobox: Locator;

    constructor(page: Page) {
        super(page);
        this.addedProductMessage= page.getByText('Product added.');
        this.gridViewIcon = page.locator('.switch-grid');
        this.listViewIcon = page.locator('.switch-list');
        this.sortCombobox = page.getByRole('combobox', { name: 'Shop order' });
    }

    async addToCartMultipleItems(nameItems: string[]) {
        await this.page.waitForLoadState('load');
        for (let i = 0; i < nameItems.length; i++) {
            await this.page.getByRole('link', { name: 'Add “' + nameItems[i] }).nth(1).click(); 
            await this.addedProductMessage.waitFor({ state: 'visible', timeout: 30_000 });
        };
        await this.addedProductMessage.waitFor({ state: 'hidden', timeout: 30_000 });
    };

    async addToCartAnItem(nameItem: string) {
        await this.page.getByRole('link', { name: 'Add “' + nameItem }).nth(1).click();
        await this.addedProductMessage.waitFor({ state: 'visible', timeout: 30_000 });
        await this.addedProductMessage.waitFor({ state: 'hidden', timeout: 30_000 });
    };

    async clickAProduct(productName: string) {
        await this.page.getByRole('link', { name: productName, exact: true }).click();
    };

    async switchView(type: 'grid' | 'list') {
        await this.page.locator(`.switch-${type}`).click();
    }

    async sortItems(method: SortMethod) {
        await this.sortCombobox.selectOption({ label: method });
        await this.page.waitForURL(/orderby/);
        await this.page.waitForTimeout(3000);
    };

}
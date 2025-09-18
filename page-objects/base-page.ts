import { Locator, Page } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;
    protected readonly cartLink: Locator;
    protected readonly shopLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator('div.header-main div.et_b_header-cart > a[href$="/cart/"]:not(div.mobile-header-wrapper a)');
        this.shopLink = page.locator('#menu-main-menu-1').getByRole('link', { name: 'Shop' });
    }

    async gotoDepartment(departmentName: string) {
        await this.page.getByText('All departments').click();
        await this.page
        .locator('#menu-all-departments-1')
        .getByRole('link', { name: departmentName }).click();
    }

    async gotoCart() {
        await this.cartLink.click();
    }

     async gotoShop() {
        await this.shopLink.click();
    }

}
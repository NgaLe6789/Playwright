import { expect, Locator, Page } from '@playwright/test';
import { UserAccount } from '../data-objects/user-account';

export class BasePage {
    protected readonly page: Page;
    protected readonly cartLink: Locator;
    protected readonly shopLink: Locator;
    protected readonly myAccount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.getByRole('link', { name: /\d\s\$/ });
        this.shopLink = page.locator('#menu-main-menu-1').getByRole('link', { name: 'Shop' });
        this.myAccount = page.getByRole('link', { name: UserAccount.username });
    }

    async gotoDepartment(departmentName: string) {
        await this.page.getByText('All departments').click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('listitem').filter({ hasText: departmentName }).click();
    }

    async gotoCart() {
        await this.page.waitForLoadState('load');
        await this.cartLink.click();
    }

    async gotoShop() {
        await this.page.waitForLoadState('load');
        await this.shopLink.click();
    }

    async gotoMyAccount() {
        await this.page.waitForLoadState('load');
        await this.myAccount.click();
    }

    async checkBorderColor(locatorCheck: Locator, color: 'red' | 'blue') {
        let expectedColor = '';
        if (color == 'red') {
            expectedColor = 'rgb(198, 40, 40)'
        }

        const borderColor = await locatorCheck.evaluate((el) => {
            const style = window.getComputedStyle(el);
            return style.getPropertyValue('border-color');
        });

        await expect(borderColor).toBe(expectedColor);

    };

}
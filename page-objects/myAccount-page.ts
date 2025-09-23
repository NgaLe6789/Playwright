import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { BillingDetails } from '../modules/billing.types';

export class MyAccountPage extends BasePage {
    private readonly ordersLink: Locator;


    constructor(page: Page) {
        super(page);
        this.ordersLink = page.getByRole('link', { name: ' Orders' });
    }

    async clickOrders() {
        await this.ordersLink.click();
    }

    async checkOrderDetails(oderNumber: string, billingDetails: BillingDetails) {
        await this.page.getByRole('row').filter({ hasText: oderNumber }).getByRole('link', { name: 'VIEW' }).click();
        await this.page.waitForLoadState('load');
        await expect(await this.page.getByText(billingDetails.firstName + billingDetails.lastName)).toBeVisible({ timeout: 30_000 });
        await expect(await this.page.getByText(billingDetails.address1)).toBeVisible({ timeout: 30_000 });
    }
}
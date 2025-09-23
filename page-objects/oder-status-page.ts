import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { BillingDetails } from '../modules/billing.types';

export class OrderStatusPage extends BasePage {


    constructor(page: Page) {
        super(page);
    }

    async checkPageDisplayed() {
        await this.page.waitForLoadState('load');
        await expect(await this.page.getByText('Thank you. Your order has been received.')).toBeVisible({ timeout: 30_000 });
    }

    async checkOrderDetails(emailBilling: string, paymentMethod: string) {
        await expect(await this.page.getByText('Email')).toHaveText(emailBilling);
        await expect(await this.page.getByText('Payment method')).toHaveText(paymentMethod);
    }

    async getOrderNumber() {
        const orderNumberText = await this.page.getByText('Order Number:').innerText({ timeout: 30000 });
        const orderNumber = orderNumberText.split(' ');
        return orderNumber[orderNumber.length - 1];
    }
}
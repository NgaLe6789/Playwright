import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { BillingDetails } from '../modules/billing.types';

export class CheckoutPage extends BasePage {

    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly company: Locator;
    private readonly country: Locator;
    private readonly address1: Locator;
    private readonly address2: Locator;
    private readonly city: Locator;
    private readonly zipcode: Locator;
    private readonly phone: Locator;
    private readonly email: Locator;
    private readonly odernote: Locator;
    private placeOrderButton: Locator;


    constructor(page: Page) {
        super(page);
        this.firstName = page.getByRole('textbox', { name: 'First name' });
        this.lastName = page.getByRole('textbox', { name: 'Last name' });
        this.company = page.getByRole('textbox', { name: 'Company name' });
        this.country = page.locator('#billing_country');
        this.address1 = page.getByRole('textbox', { name: 'Street address' });
        this.address2 = page.getByRole('textbox', { name: 'Apartment, suite, unit, etc' });
        this.zipcode = page.getByRole('textbox', { name: 'Postcode / ZIP' });
        this.city = page.getByRole('textbox', { name: 'Town / City' });
        this.phone = page.getByRole('textbox', { name: 'Phone' });
        this.email = page.getByRole('textbox', { name: 'Email address' });
        this.odernote = page.getByRole('textbox', { name: 'Order notes' });
        this.placeOrderButton = page.getByRole('button', { name: 'PLACE ORDER' });
    }

    async assertCheckoutPageDisplayed() {
        await expect(this.page.getByText('Hurry up, these products are limited, checkout within')).toBeVisible({ timeout: 10_000 });
    }

    async fillBillingForm(data: BillingDetails, method: string) {
        await this.firstName.fill(data.firstName);
        await this.lastName.fill(data.lastName);
        await this.company.fill(data.company);
        await this.country.selectOption({label: data.country});
        await this.address1.fill(data.address1);
        await this.address2.fill(data.address2);
        await this.city.fill(data.city);
        await this.zipcode.fill(data.zipcode);
        await this.phone.fill(data.phone);
        await this.email.fill(data.email);
        await this.odernote.fill(data.odernote);
        const paymentOption = await this.page.getByRole('radio', { name: method }).check();
    }

    async placeOrder() {
        await this.placeOrderButton.waitFor({state: "visible"});
        await this.placeOrderButton.click();
    }
    
}
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class HomePage extends BasePage {
    private readonly popupCloseButton: Locator;
    private readonly loginLink: Locator;

    constructor(page: Page) {
        super(page);
        this.popupCloseButton = page.locator('div.popmake').getByRole('button', { name: 'Close' });
        this.loginLink = page.getByRole('link', { name: 'Log in / Sign up' });
    }

    async lauchPage() {
        await this.page.goto('https://demo.testarchitect.com/');
        await this.popupCloseButton.click();
        await this.page.waitForLoadState('load');
    }

    async goToLogin() {
        await this.lauchPage();
        await this.loginLink.click();
    }
}
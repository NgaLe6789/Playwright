import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
    private readonly loginLink: Locator;
    private readonly userTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.userTextbox = page.getByRole('textbox', { name: 'Username or email address *' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password *' });
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.loginLink = page.getByRole('link', { name: 'Log in / Sign up' });
    }

    async submitlogin(username: string, password: string) {
        await this.userTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();
    }

    async login(username: string, password: string) {
        await this.page.goto('https://demo.testarchitect.com/');
        const popupCloseButton = this.page.locator('div.popmake').getByRole('button', { name: 'Close' });
        await popupCloseButton.click();
        await this.loginLink.click();
        await this.submitlogin(username, password);
    }
}
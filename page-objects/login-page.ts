import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
    private readonly userTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.userTextbox = page.getByRole('textbox', { name: 'Username or email address *' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password *' });
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }

    async login(username: string, password: string) {
        await this.userTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();
    }
}
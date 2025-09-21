import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class ProductPage extends BasePage {
    private readonly reviewTab: Locator;
    private readonly reviewTextbox: Locator;


    constructor(page: Page) {
        super(page);
        this.reviewTab= page.getByRole('link', { name: 'Reviews (1)' });
        this.reviewTextbox= page.getByRole('textbox', { name: 'Your review' });
    }

    async clickTab(tabname: 'Description' | 'Reviews') {
        await this.page.getByRole('link', { name: tabname}).click();
    };

    async submitReview(star: '1' | '2' | '3' | '4' | '5', comment: string) {
        await this.page.getByRole('link', { name: '󩌍' +  star}).click();
        await this.reviewTextbox.fill(comment);
    }

}
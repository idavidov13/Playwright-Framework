import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for the Home Page.
 * @export
 * @class HomePage
 * @typedef {HomePage}
 */
export class HomePage {
    readonly page: Page;
    readonly homeBanner: Locator;
    readonly yourFeedBtn: Locator;
    readonly globalFeedBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeBanner = page.getByRole('heading', { name: 'conduit' });
        this.yourFeedBtn = page.getByText('Your Feed');
        this.globalFeedBtn = page.getByText('Global Feed');
    }

    /**
     * Navigates to the home page.
     * @returns {Promise<void>} Resolves when the navigation is complete.
     */
    async navigateToHomePage(): Promise<void> {
        await this.page.goto(process.env.URL as string, {
            waitUntil: 'networkidle',
        });

        await expect(this.homeBanner).toBeVisible();
        await expect(this.yourFeedBtn).toBeVisible();
        expect(this.globalFeedBtn).toBeVisible();
    }
}

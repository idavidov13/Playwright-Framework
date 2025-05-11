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
    readonly bondarAcademyLink: Locator;
    readonly noArticlesMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeBanner = page.getByRole('heading', { name: 'conduit' });
        this.yourFeedBtn = page.getByText('Your Feed');
        this.globalFeedBtn = page.getByText('Global Feed');
        this.bondarAcademyLink = page.getByRole('link', {
            name: 'www.bondaracademy.com',
        });
        this.noArticlesMessage = page.getByText('No articles are here... yet.');
    }

    /**
     * Navigates to the home page as Guest.
     * @returns {Promise<void>} Resolves when the navigation is complete.
     */
    async navigateToHomePageGuest(): Promise<void> {
        await this.page.goto(process.env.URL as string, {
            waitUntil: 'networkidle',
        });

        await expect(this.homeBanner).toBeVisible();
    }

    /**
     * Navigates to the home page as User.
     * @returns {Promise<void>} Resolves when the navigation is complete.
     */
    async navigateToHomePageUser(): Promise<void> {
        await this.page.goto(process.env.URL as string, {
            waitUntil: 'networkidle',
        });

        await expect(this.yourFeedBtn).toBeVisible();
        expect(this.globalFeedBtn).toBeVisible();
    }
}

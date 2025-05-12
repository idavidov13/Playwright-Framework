import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for the Navigation functionality.
 * @export
 * @class NavPage
 * @typedef {NavPage}
 */
export class NavPage {
    readonly page: Page;
    readonly navBar: Locator;
    readonly homePageLink: Locator;
    readonly newArticleButton: Locator;
    readonly settingsButton: Locator;
    readonly settingsPageTitle: Locator;
    readonly logoutButton: Locator;
    readonly conduitIcon: Locator;
    readonly signInNavigationLink: Locator;
    readonly signInPageTitle: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly signUpNavigationLink: Locator;
    readonly signUpPageTitle: Locator;
    readonly homePageHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navBar = page.getByRole('navigation');
        this.conduitIcon = this.navBar.getByRole('link', { name: 'conduit' });
        this.homePageLink = page.getByRole('link', {
            name: 'Home',
            exact: true,
        });
        this.newArticleButton = page.getByRole('link', {
            name: '  New Article',
        });
        this.settingsButton = page.getByRole('link', { name: '  Settings' });
        this.settingsPageTitle = page.getByRole('heading', {
            name: 'Your Settings',
        });
        this.logoutButton = page.getByRole('button', {
            name: 'Or click here to logout.',
        });
        this.signInNavigationLink = page.getByRole('link', { name: 'Sign in' });
        this.signInPageTitle = page.getByRole('heading', { name: 'Sign in' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.signUpNavigationLink = page.getByRole('link', { name: 'Sign up' });
        this.signUpPageTitle = page.getByRole('heading', { name: 'Sign up' });
        this.homePageHeading = page.getByRole('heading', { name: 'conduit' });
    }

    /**
     * Navigates to the Home page using the Home link.
     * @returns {Promise<void>} Resolves when navigation is complete.
     */
    async navigateToHomePage(): Promise<void> {
        await this.homePageLink.click();

        await expect(this.homePageHeading).toBeVisible();
    }

    /**
     * Navigates to the Home page using the Conduit icon.
     * @returns {Promise<void>} Resolves when navigation is complete.
     */
    async navigateToHomePageByIcon(): Promise<void> {
        await this.conduitIcon.click();

        await expect(this.homePageHeading).toBeVisible();
    }

    /**
     * Navigates to the Sign In page.
     * @returns {Promise<void>} Resolves when navigation is complete.
     */
    async navigateToSignInPage(): Promise<void> {
        await this.signInNavigationLink.click();

        await expect(this.signInPageTitle).toBeVisible();
    }

    /**
     * Navigates to the Sign Up page.
     * @returns {Promise<void>} Resolves when navigation is complete.
     */
    async navigateToSingUpPage(): Promise<void> {
        await this.signUpNavigationLink.click();

        await expect(this.signUpPageTitle).toBeVisible();
    }

    /**
     * Logs in the user using the provided email and password.
     * @param {string} email - The email address of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<void>} Resolves when the login process is complete.
     */
    async logIn(email: string, password: string): Promise<void> {
        await this.navigateToSignInPage();

        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
        await this.page.waitForResponse(`${process.env.API_URL}api/tags`);

        await expect(
            this.page.getByRole('navigation').getByText(process.env.USER_NAME!)
        ).toBeVisible();
    }

    /**
     * Logs out the currently logged-in user.
     * @returns {Promise<void>} Resolves when the logout process is complete.
     */
    async logOut(): Promise<void> {
        await this.settingsButton.click();
        await expect(this.settingsPageTitle).toBeVisible();

        await this.logoutButton.click();

        await expect(this.homePageHeading).toBeVisible();
    }
}

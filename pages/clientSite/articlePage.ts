import { Page, Locator, expect } from '@playwright/test';

/**
 * This is the page object for Article Page functionality.
 * @export
 * @class ArticlePage
 * @typedef {ArticlePage}
 */
export class ArticlePage {
    readonly page: Page;
    readonly articleTitleInput: Locator;
    readonly articleDescriptionInput: Locator;
    readonly articleBodyInput: Locator;
    readonly articleTagInput: Locator;
    readonly publishArticleButton: Locator;
    readonly publishErrorMessage: Locator;
    readonly editArticleButton: Locator;
    readonly deleteArticleButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.articleTitleInput = page.getByRole('textbox', {
            name: 'Article Title',
        });
        this.articleDescriptionInput = page.getByRole('textbox', {
            name: "What's this article about?",
        });
        this.articleBodyInput = page.getByRole('textbox', {
            name: 'Write your article (in',
        });
        this.articleTagInput = page.getByRole('textbox', {
            name: 'Enter tags',
        });
        this.publishArticleButton = page.getByRole('button', {
            name: 'Publish Article',
        });
        this.publishErrorMessage = page.getByText("title can't be blank");
        this.editArticleButton = page
            .getByRole('link', { name: ' Edit Article' })
            .first();
        this.deleteArticleButton = page
            .getByRole('button', { name: ' Delete Article' })
            .first();
    }

    /**
     * Navigates to the edit article page by clicking the edit button.
     * Waits for the page to reach a network idle state after navigation.
     * @returns {Promise<void>}
     */
    async navigateToEditArticlePage(): Promise<void> {
        await this.editArticleButton.click();

        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Publishes an article with the given details.
     * @param {string} title - The title of the article.
     * @param {string} description - A brief description of the article.
     * @param {string} body - The main content of the article.
     * @param {string} [tags] - Optional tags for the article.
     * @returns {Promise<void>}
     */
    async publishArticle(
        title: string,
        description: string,
        body: string,
        tags?: string
    ): Promise<void> {
        await this.articleTitleInput.fill(title);
        await this.articleDescriptionInput.fill(description);
        await this.articleBodyInput.fill(body);

        if (tags) {
            await this.articleTagInput.fill(tags);
        }

        await this.publishArticleButton.click();

        await this.page.waitForResponse(
            (response) =>
                response.url().includes('/api/articles/') &&
                response.request().method() === 'GET'
        );

        await expect(
            this.page.getByRole('heading', { name: title })
        ).toBeVisible();
    }

    /**
     * Edits an existing article with the given details.
     * @param {string} title - The new title of the article.
     * @param {string} description - The new description of the article.
     * @param {string} body - The new content of the article.
     * @param {string} [tags] - Optional new tags for the article.
     * @returns {Promise<void>}
     */
    async editArticle(
        title: string,
        description: string,
        body: string,
        tags?: string
    ): Promise<void> {
        await this.articleTitleInput.fill(title);
        await this.articleDescriptionInput.fill(description);
        await this.articleBodyInput.fill(body);

        if (tags) {
            await this.articleTagInput.fill(tags);
        }

        await this.publishArticleButton.click();

        await this.page.waitForResponse(
            (response) =>
                response.url().includes('/api/articles/') &&
                response.request().method() === 'GET'
        );

        await expect(
            this.page.getByRole('heading', { name: title })
        ).toBeVisible();
    }

    /**
     * Deletes the currently selected article.
     * @returns {Promise<void>}
     */
    async deleteArticle(): Promise<void> {
        await this.deleteArticleButton.click();

        await expect(this.page.getByText('Global Feed')).toBeVisible();
    }
}

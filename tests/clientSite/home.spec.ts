import { test, expect } from '../../fixtures/pom/test-options';
import articleData from '../../test-data/articleData.json';

test.describe('Verify Home Page And Bondar Academy Website', () => {
    test.use({ storageState: '.auth/guestSession.json' });

    test(
        'Verify Successful Loading of Home Page',
        { tag: '@Smoke' },
        async ({ homePage }) => {
            await homePage.navigateToHomePageGuest();
        }
    );

    test(
        'Verify Link to Bondar Academy Website',
        { tag: '@Regression' },
        async ({ homePage, context }) => {
            await test.step('Navigate to Home Page', async () => {
                await homePage.navigateToHomePageGuest();
            });

            await test.step('Verify Navigation to Bondar Academy Website', async () => {
                const [newPage] = await Promise.all([
                    context.waitForEvent('page'),
                    homePage.bondarAcademyLink.click(),
                ]);

                await newPage.waitForLoadState();

                expect(newPage.url()).toContain(
                    'https://www.bondaracademy.com/'
                );
            });
        }
    );
});

test.describe('Mock API Response', () => {
    test.use({ storageState: '.auth/guestSession.json' });

    test(
        'Mock API Response',
        { tag: '@Regression' },
        async ({ page, homePage }) => {
            await page.route(
                `${process.env.API_URL}api/articles?limit=10&offset=0`,
                async (route) => {
                    await route.fulfill({
                        status: 200,
                        contentType: 'application/json',
                        body: JSON.stringify({
                            articles: [],
                            articlesCount: 0,
                        }),
                    });
                }
            );

            await page.route(
                `${process.env.API_URL}api/tags`,
                async (route) => {
                    await route.fulfill({
                        status: 200,
                        contentType: 'application/json',
                        body: JSON.stringify({
                            tags: articleData.create.article.tagList,
                        }),
                    });
                }
            );

            await homePage.navigateToHomePageGuest();

            await expect(homePage.noArticlesMessage).toBeVisible();

            for (const tag of articleData.create.article.tagList) {
                await expect(
                    page.locator('.tag-list').getByText(tag)
                ).toBeVisible();
            }
        }
    );
});

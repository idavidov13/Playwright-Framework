import { test, expect } from '../../fixtures/pom/test-options';

test.describe('Verify Home Page And Bondar Academy Website', () => {
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

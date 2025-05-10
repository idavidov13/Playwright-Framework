import { test, expect } from '../../fixtures/pom/test-options';

test.describe('Verify Home Page', () => {
    test.use({ storageState: '.auth/guestSession.json' });

    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToHomePageGuest();
    });

    test(
        'Verify Successful Log In/Log Out',
        { tag: '@Smoke' },
        async ({ navPage }) => {
            await test.step('Perform Log In', async () => {
                await navPage.logIn(process.env.EMAIL!, process.env.PASSWORD!);
            });

            await test.step('Perform Log Out', async () => {
                await navPage.logOut();
            });
        }
    );

    test(
        'Verify Navigation from Navigation Bar',
        { tag: '@Sanity' },
        async ({ navPage }) => {
            await test.step('Navigate to Sign In Page', async () => {
                await navPage.navigateToSignInPage();
            });

            await test.step('Navigate to Home Page by Icon', async () => {
                await navPage.navigateToHomePageByIcon();
            });

            await test.step('Navigate to Sign Up Page', async () => {
                await navPage.navigateToSingUpPage();
            });

            await test.step('Navigate to Home Page by Home Link', async () => {
                await navPage.navigateToHomePage();
            });
        }
    );
});

import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/clientSite/homePage';

export type FrameworkFixtures = {
    homePage: HomePage;
};

export const test = base.extend<FrameworkFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
});

export { expect, request } from '@playwright/test';

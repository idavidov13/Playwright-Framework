import { test, expect } from '../../fixtures/pom/test-options';

test('Failing Test', { tag: '@Smoke' }, async ({ homePage }) => {
    await homePage.navigateToHomePageUser();
    expect(2).toEqual(3);
});

import { test, expect } from '../../fixtures/pom/test-options';

test('Failing Test', { tag: '@Regressions' }, async ({ homePage }) => {
    await homePage.navigateToHomePageUser();
    expect(2).toEqual(3);
});

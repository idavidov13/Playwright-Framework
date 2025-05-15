import { test, expect } from '../../fixtures/pom/test-options';

test('Failing Sanity Test', { tag: '@Sanity' }, async ({ homePage }) => {
    await homePage.navigateToHomePageUser();
    expect(2).toEqual(3);
});

test('Failing API Test', { tag: '@Api' }, async ({ homePage }) => {
    await homePage.navigateToHomePageUser();
    expect(2).toEqual(3);
});

test('Failing Regression Test', { tag: '@Regressions' }, async ({ homePage }) => {
    await homePage.navigateToHomePageUser();
    expect(2).toEqual(3);
});

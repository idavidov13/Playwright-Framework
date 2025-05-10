import { test } from '../../fixtures/pom/test-options';

test.describe('Verify Publish/Edit/Delete an Article', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateToHomePageUser();
    });

    test(
        'Verify Publish/Edit/Delete an Article',
        { tag: '@Sanity' },
        async ({ navPage, articlePage }) => {
            await test.step('Verify Publish an Article', async () => {
                await navPage.newArticleButton.click();

                await articlePage.publishArticle(
                    'Test_Article',
                    'Test_Description',
                    'Test_Body',
                    'Test_Tag'
                );
            });

            await test.step('Verify Edit an Article', async () => {
                await articlePage.editArticle(
                    'Test_Article_Updated',
                    'Test_Description_Updated',
                    'Test_Body_Updated',
                    'Test_Tag_Updated'
                );
            });

            await test.step('Verify Delete an Article', async () => {
                await articlePage.deleteArticle();
            });
        }
    );
});

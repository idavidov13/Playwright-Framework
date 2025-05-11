import { test } from '../../fixtures/pom/test-options';
import { faker } from '@faker-js/faker';

test.describe('Verify Publish/Edit/Delete an Article', () => {
    const randomArticleTitle = faker.lorem.words(3);
    const randomArticleDescription = faker.lorem.sentence();
    const randomArticleBody = faker.lorem.paragraphs(2);
    const randomArticleTag = faker.lorem.word();

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
                    randomArticleTitle,
                    randomArticleDescription,
                    randomArticleBody,
                    randomArticleTag
                );
            });

            await test.step('Verify Edit an Article', async () => {
                await articlePage.editArticle(
                    `Updated ${randomArticleTitle}`,
                    `Updated ${randomArticleDescription}`,
                    `Updated ${randomArticleBody}`
                );
            });

            await test.step('Verify Delete an Article', async () => {
                await articlePage.deleteArticle();
            });
        }
    );
});

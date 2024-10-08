import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { ArticlePage, LoginPage, WelcomePage } from '@pages/index';
import { HeaderNavigation, Notifications } from '@components/index';
import { IArticle, IComment, IUser } from '@interfaces/index';

test.describe('Article operations (GUI)', { tag: '@gui' }, () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;
  let browser: Browser;
  let context: BrowserContext;

  let loginPage: LoginPage;
  let welcomePage: WelcomePage;
  let articlePage: ArticlePage;
  let headerNavigation: HeaderNavigation;
  let notifications: Notifications;

  const user: IUser = {
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD
  };

  const article: IArticle = {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(3)
  };

  const comment: IComment = { body: faker.lorem.paragraph() };

  test.beforeAll(async ({ browser: b }) => {
    browser = b;
    context = await browser.newContext();
    page = await context.newPage();

    loginPage = new LoginPage(page);
    welcomePage = new WelcomePage(page);
    articlePage = new ArticlePage(page, article);
    headerNavigation = new HeaderNavigation(page);
    notifications = new Notifications(page);

    loginPage.login(user);
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

  test('should add new article', async () => {
    const successfulAddedArticleText = 'Article was created';

    await page.goto(welcomePage.url);

    await headerNavigation.articles.click();
    await headerNavigation.addArticle.click();

    await articlePage.fillForm(article);
    await articlePage.submit();

    await expect(articlePage.articleTitle).toHaveText(article.title);
    await expect(articlePage.articleContent).toHaveText(article.body);
    await expect(notifications.alertPopup).toHaveText(
      successfulAddedArticleText
    );
  });

  test('should add comment', async () => {
    await page.goto(articlePage.url);

    await articlePage.select(article);
    await articlePage.addCommentButton.click();
    await articlePage.commentInput.fill(comment.body);
    await articlePage.saveCommentButton.click();

    await expect(articlePage.comment).toHaveText(comment.body);
  });

  test('should delete article', async () => {
    await page.goto(articlePage.url);
    await articlePage.select(article);
    await articlePage.delete();

    await expect(articlePage.articleTitle).toBeHidden();
    await expect(page).toHaveURL(articlePage.url);
  });
});

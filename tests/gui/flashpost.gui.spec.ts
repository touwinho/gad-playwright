import { HeaderNavigation } from '@components/headerNavigation';
import { faker } from '@faker-js/faker';
import { IFlashpost } from '@interfaces/index';
import { IUser } from '@interfaces/user';
import { LoginPage, WelcomePage, FlashpostPage } from '@pages/index';
import { test, expect, Page, Browser, BrowserContext } from '@playwright/test';

test.describe('Flashposts operations (GUI)', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;
  let browser: Browser;
  let context: BrowserContext;

  let loginPage: LoginPage;
  let welcomePage: WelcomePage;
  let flashpostPage: FlashpostPage;
  let headerNavigation: HeaderNavigation;

  if (!process.env.USER_EMAIL || !process.env.USER_PASSWORD) {
    throw new Error(
      'Missing environment variables: USER_EMAIL and/or USER_PASSWORD'
    );
  }

  test.beforeAll(async ({ browser: b }) => {
    browser = b;
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.beforeEach(async () => {
    loginPage = new LoginPage(page);
    welcomePage = new WelcomePage(page);
    flashpostPage = new FlashpostPage(page);
    headerNavigation = new HeaderNavigation(page);
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

  const user: IUser = {
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD
  };

  let flashposts: IFlashpost[];

  test.beforeEach(async () => {
    loginPage = new LoginPage(page);
    welcomePage = new WelcomePage(page);
    flashpostPage = new FlashpostPage(page);
    headerNavigation = new HeaderNavigation(page);

    flashposts = [
      {
        body: faker.lorem.sentence(),
        isPublic: true,
        color: faker.color.rgb(),
        icon: flashpostPage.newestFlashPostPublicIcon
      },
      {
        body: faker.lorem.sentence(),
        isPublic: false,
        color: faker.color.rgb(),
        icon: flashpostPage.newestFlashPostPrivateIcon
      }
    ];
  });

  test('should login on existing account', async () => {
    await page.goto(loginPage.url);

    await loginPage.fillForm(user);
    await loginPage.submitButton.click();

    await expect(page).toHaveURL(welcomePage.url);
    await expect(page).toHaveTitle(welcomePage.title);
  });

  test('should create a new flashposts (public and private)', async () => {
    await page.goto(welcomePage.url);
    await headerNavigation.flashposts.click();

    for (const flashpost of flashposts) {
      await flashpostPage.createFlashpostButton.click();

      await flashpostPage.fillFlashpostForm(flashpost);
      await flashpostPage.submitFlashpostButton.click();

      await expect(flashpostPage.confirmationToast).toHaveText(
        flashpostPage.createConfirmationToastText
      );
      await expect(flashpostPage.newestFlashpost).toHaveText(flashpost.body);
    }
    await expect(page).toHaveURL(flashpostPage.url);
  });

  test('should delete the flashposts (public and private)', async () => {
    await page.goto(flashpostPage.url);

    for (const flashpost of flashposts) {
      await flashpostPage.deleteNewestFlashpostButton.click();

      await expect(flashpostPage.confirmationToast).toHaveText(
        flashpostPage.deleteConfirmationToastText
      );
      await expect(flashpostPage.newestFlashpost).not.toHaveText(
        flashpost.body
      );
    }
  });
});

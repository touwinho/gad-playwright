import { HeaderNavigation } from '@components/headerNavigation';
import { faker } from '@faker-js/faker';
import { IFlashpost, IUser } from '@interfaces/index';
import { LoginPage, WelcomePage, FlashpostPage } from '@pages/index';
import { test, expect, Page, Browser, BrowserContext } from '@playwright/test';

test.describe('Flashposts operations (GUI)', { tag: '@gui' }, () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;
  let browser: Browser;
  let context: BrowserContext;

  let loginPage: LoginPage;
  let welcomePage: WelcomePage;
  let flashpostPage: FlashpostPage;
  let headerNavigation: HeaderNavigation;

  const user: IUser = {
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD
  };
  let flashposts: IFlashpost[];

  test.beforeAll(async ({ browser: b }) => {
    browser = b;
    context = await browser.newContext();
    page = await context.newPage();

    loginPage = new LoginPage(page);
    welcomePage = new WelcomePage(page);
    flashpostPage = new FlashpostPage(page);
    headerNavigation = new HeaderNavigation(page);

    flashposts = [
      {
        body: faker.lorem.sentence(),
        isPublic: true,
        color: faker.color.rgb(),
        icon: flashpostPage.publicFlashpostIconClass
      },
      {
        body: faker.lorem.sentence(),
        isPublic: false,
        color: faker.color.rgb(),
        icon: flashpostPage.privateFlashpostIconClass
      }
    ];

    loginPage.login(user);
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

  test('should create a new flashposts (public and private)', async () => {
    await page.goto(welcomePage.url);
    await headerNavigation.flashposts.click();

    for (const flashpost of flashposts) {
      await flashpostPage.createFlashpostButton.click();

      await flashpostPage.fillFlashpostForm(flashpost);
      await flashpostPage.submitFlashpostButton.click();

      await expect(flashpostPage.confirmationToast.first()).toHaveText(
        flashpostPage.createConfirmationToastText
      );
      await expect(
        flashpostPage.locatePostByText(flashpost.body)
      ).toBeVisible();
      await expect(
        flashpostPage.locateVisibilityIconByText(flashpost.body)
      ).toHaveClass(flashpost.icon);
    }
    await expect(page).toHaveURL(flashpostPage.url);
  });

  test('should delete the flashposts (public and private)', async () => {
    await page.goto(flashpostPage.url);

    for (const flashpost of flashposts) {
      await flashpostPage.locateTrashIconByText(flashpost.body).click();

      await expect(flashpostPage.confirmationToast).toHaveText(
        flashpostPage.deleteConfirmationToastText
      );
      await expect(flashpostPage.locatePostByText(flashpost.body)).toBeHidden();
    }
  });
});

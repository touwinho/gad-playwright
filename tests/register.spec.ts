import { test, expect, Page, BrowserContext, Browser } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { RegisterPage, LoginPage, WelcomePage } from '../pages';
import { Notifications } from '../components';
import { IUser } from '../interfaces';

test.describe('Register new account', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;
  let browser: Browser;
  let context: BrowserContext;

  let registerPage: RegisterPage;
  let loginPage: LoginPage;
  let welcomePage: WelcomePage;
  let notifications: Notifications;

  const user: IUser = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    dateOfBirth: faker.date.past().toISOString().split('T')[0]
  };

  test.beforeAll(async ({ browser: b }) => {
    browser = b;
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

  test.beforeEach(async () => {
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
    welcomePage = new WelcomePage(page);
    notifications = new Notifications(page);
  });

  test('should create a new user account successfully', async () => {
    await page.goto(registerPage.url);

    await registerPage.fillRegistrationForm(user);
    await registerPage.submit();

    await expect(page).toHaveTitle(registerPage.title);
    await expect(notifications.alertPopup).toHaveText(
      registerPage.successfulRegisterText
    );
    await expect(page).toHaveURL(loginPage.url);
    await expect(page).toHaveTitle(loginPage.title);
  });

  test('should login on recently created account', async () => {
    await page.goto(loginPage.url);
    await loginPage.fillLoginForm(user);
    await loginPage.submit();

    await expect(page).toHaveURL(welcomePage.url);
    await expect(welcomePage.welcomeText).toHaveText(`Hi ${user.email}!`);
  });

  test('delete recently created account', async () => {
    await page.goto(welcomePage.url);
    await welcomePage.deleteAccount();

    await loginPage.fillLoginForm(user);
    await loginPage.submit();

    await expect(loginPage.loginError).toHaveText(loginPage.loginErrorText);
  });
});

import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegisterPage } from '../pages/register.page';
import { LoginPage } from '../pages/login.page';
import { WelcomePage } from '../pages/welcome.page';

test.describe('Register new account', () => {
  test.describe.configure({ mode: 'serial' });

  const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    dateOfBirth: faker.date.past().toISOString().split('T')[0]
  };

  let registerPage: RegisterPage;
  let loginPage: LoginPage;
  let welcomePage: WelcomePage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
    welcomePage = new WelcomePage(page);
  });

  test('should create a new user account successfully', async ({ page }) => {
    await page.goto(registerPage.url);

    await registerPage.fillRegistrationForm(user);
    await registerPage.registerButton.click();

    await expect(registerPage.alertPopup).toHaveText(
      registerPage.successfulRegisterText
    );

    await expect(page).toHaveURL(loginPage.url);
  });

  test('should login on recently created account', async ({ page }) => {
    await page.goto(loginPage.url);

    await loginPage.fillLoginForm(user.email, user.password);
    await loginPage.submitButton.click();

    await expect(page).toHaveURL(welcomePage.url);

    await expect(welcomePage.welcomeText).toHaveText(`Hi ${user.email}!`);
  });
});

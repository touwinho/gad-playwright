import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RegisterPage } from '../pages/register.page';
import { LoginPage } from '../pages/login.page';
import { WelcomePage } from '../pages/welcome.page';

test.describe('Register new account', () => {
  const date = faker.date.past();
  const dateOfBirth = date.toISOString().split('T')[0];

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  test('should create account', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    await page.goto(registerPage.url);

    await registerPage.firstNameInput.fill(firstName);
    await registerPage.lastNameInput.fill(lastName);
    await registerPage.emailInput.fill(email);
    await registerPage.birthdateInput.fill(dateOfBirth);
    await registerPage.closeCalendarButton.click();
    await registerPage.passwordInput.fill(password);
    await registerPage.registerButton.click();

    await expect(registerPage.alertPopup).toHaveText(
      registerPage.successfulRegisterText
    );

    await expect(page).toHaveURL(loginPage.url);
  });

  test('should login on created account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    await page.goto(loginPage.url);

    await loginPage.emailInput.fill(email);
    await loginPage.passwordInput.fill(password);
    await loginPage.submitButton.click();

    await expect(page).toHaveURL(welcomePage.url);

    await expect(welcomePage.welcomeText).toHaveText(`Hi ${email}!`);
  });
});

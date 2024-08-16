import { Page } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

  url = '/register.html';
  firstNameInput = this.page.getByTestId('firstname-input');
  lastNameInput = this.page.getByTestId('lastname-input');
  emailInput = this.page.getByTestId('email-input');
  birthdateInput = this.page.getByTestId('birthdate-input');
  closeCalendarButton = this.page.getByRole('button', { name: 'Done' });
  passwordInput = this.page.getByTestId('password-input');
  registerButton = this.page.getByTestId('register-button');
  alertPopup = this.page.getByTestId('alert-popup');
  successfulRegisterText = 'User created';

  async fillRegistrationForm(user) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.birthdateInput.fill(user.dateOfBirth);
    await this.closeCalendarButton.click();
    await this.passwordInput.fill(user.password);
  }
}

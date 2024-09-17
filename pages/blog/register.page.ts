import { Page } from '@playwright/test';
import { IUser } from '@interfaces/index';

export class RegisterPage {
  constructor(private page: Page) {}

  url = '/register.html';
  title = '🦎 GAD | Register';
  firstNameInput = this.page.getByTestId('firstname-input');
  lastNameInput = this.page.getByTestId('lastname-input');
  emailInput = this.page.getByTestId('email-input');
  birthdateInput = this.page.getByTestId('birthdate-input');
  closeCalendarButton = this.page.getByRole('button', {
    name: 'Done'
  });
  passwordInput = this.page.getByTestId('password-input');
  submitButton = this.page.getByTestId('register-button');

  async fillRegistrationForm(user: IUser): Promise<void> {
    await this.firstNameInput.fill(user.firstName!);
    await this.lastNameInput.fill(user.lastName!);
    await this.emailInput.fill(user.email);
    await this.birthdateInput.fill(user.dateOfBirth!);
    await this.closeCalendarButton.click();
    await this.passwordInput.fill(user.password);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}

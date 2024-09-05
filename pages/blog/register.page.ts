import { Page, Locator } from '@playwright/test';
import { IUser } from '../../interfaces';

export class RegisterPage {
  readonly url = '/register.html';
  readonly title = '🦎 GAD | Register';
  readonly successfulRegisterText = 'User created';
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly birthdateInput: Locator;
  readonly closeCalendarButton: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(private page: Page) {
    this.firstNameInput = this.page.getByTestId('firstname-input');
    this.lastNameInput = this.page.getByTestId('lastname-input');
    this.emailInput = this.page.getByTestId('email-input');
    this.birthdateInput = this.page.getByTestId('birthdate-input');
    this.closeCalendarButton = this.page.getByRole('button', { name: 'Done' });
    this.passwordInput = this.page.getByTestId('password-input');
    this.submitButton = this.page.getByTestId('register-button');
  }

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

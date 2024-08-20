import { Page, Locator } from '@playwright/test';
import { IUser } from '../interfaces';

export class LoginPage {
  readonly url = '/login/';
  readonly title = '🦎 GAD | Login';
  readonly loginErrorText = 'Invalid username or password';
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly loginError: Locator;

  constructor(private page: Page) {
    this.emailInput = this.page.locator("input[name='username']");
    this.passwordInput = this.page.locator("input[name='password']");
    this.submitButton = this.page.locator("input[type='submit']");
    this.loginError = this.page.getByTestId('login-error');
  }

  async fillLoginForm(user: IUser): Promise<void> {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}

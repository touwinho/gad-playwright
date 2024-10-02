import { Page } from '@playwright/test';
import { IUser } from '@interfaces/index';

export class LoginPage {
  constructor(private page: Page) {}

  url = '/login/';
  title = '🦎 GAD | Login';
  emailInput = this.page.locator("input[name='username']");
  passwordInput = this.page.locator("input[name='password']");
  submitButton = this.page.locator("input[type='submit']");
  error = this.page.getByTestId('login-error');

  async fillForm(user: IUser): Promise<void> {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async login(user: IUser): Promise<void> {
    await this.fillForm(user);
    await this.submit();
  }
}

import { Page, Locator } from '@playwright/test';
import { TUser } from '../types/user';

export class LoginPage {
  readonly url: string = '/login/';
  readonly title: string = '🦎 GAD | Login';
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(private page: Page) {
    this.emailInput = this.page.locator("input[name='username']");
    this.passwordInput = this.page.locator("input[name='password']");
    this.submitButton = this.page.locator("input[type='submit']");
  }

  async fillLoginForm(user: TUser): Promise<void> {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}

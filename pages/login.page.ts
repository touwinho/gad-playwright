import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  url = '/login/';
  emailInput = this.page.locator("input[name='username']");
  passwordInput = this.page.locator("input[name='password']");
  submitButton = this.page.locator("input[type='submit']");
  successLoginRedirect = '/welcome';
}

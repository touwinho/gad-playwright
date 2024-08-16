import { Page } from '@playwright/test';

export class WelcomePage {
  constructor(private page: Page) {}

  url = '/welcome';
  welcomeText = this.page.getByTestId('hello');
}

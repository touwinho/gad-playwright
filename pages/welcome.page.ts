import { Page, Locator } from '@playwright/test';

export class WelcomePage {
  readonly page: Page;
  readonly url: string;
  readonly title: string;
  readonly welcomeText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = '/welcome';
    this.title = '🦎 GAD | Welcome';
    this.welcomeText = this.page.getByTestId('hello');
  }
}

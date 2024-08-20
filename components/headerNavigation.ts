import { Page, Locator } from '@playwright/test';

export class HeaderNavigation {
  readonly articles: Locator;
  readonly addArticle: Locator;

  constructor(private page: Page) {
    this.articles = this.page.getByTestId('open-articles');
    this.addArticle = this.page.getByRole('button', { name: 'Add Article' });
  }
}

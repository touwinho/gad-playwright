import { Page, Locator } from '@playwright/test';

export class HeaderNavigation {
  readonly articles: Locator;
  readonly addArticle: Locator;
  readonly profileDropdown: Locator;
  readonly logoutButton: Locator;

  constructor(private page: Page) {
    this.articles = this.page.getByTestId('open-articles');
    this.addArticle = this.page.getByRole('button', { name: 'Add Article' });
    this.profileDropdown = this.page.getByTestId('btn-dropdown');
    this.logoutButton = this.page.getByRole('link', { name: 'Logout' });
  }
}

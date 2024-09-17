import { Page } from '@playwright/test';

export class HeaderNavigation {
  constructor(private page: Page) {}

  articles = this.page.getByTestId('open-articles');
  addArticle = this.page.getByRole('button', { name: 'Add Article' });
  profileDropdown = this.page.getByTestId('btn-dropdown');
  logoutButton = this.page.getByRole('link', { name: 'Logout' });
}

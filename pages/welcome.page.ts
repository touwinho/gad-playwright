import { Page, Locator } from '@playwright/test';

export class WelcomePage {
  readonly url = '/welcome';
  readonly title = '🦎 GAD | Welcome';
  readonly welcomeText: Locator;
  readonly deleteButton: Locator;

  constructor(private page: Page) {
    this.welcomeText = this.page.getByTestId('hello');
    this.deleteButton = this.page.getByTestId('deleteButton');
  }

  async deleteAccount(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.deleteButton.click();
  }
}

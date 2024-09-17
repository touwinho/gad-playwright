import { Page } from '@playwright/test';

export class WelcomePage {
  constructor(private page: Page) {}

  url = '/welcome';
  title = '🦎 GAD | Welcome';
  welcomeHeader = this.page.getByTestId('hello');
  deleteButton = this.page.getByTestId('deleteButton');

  async deleteAccount(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.deleteButton.click();
  }
}

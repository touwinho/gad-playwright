import { Page } from '@playwright/test';

export class FlashpostPage {
  constructor(private page: Page) {}

  title = '🦎 GAD | Flashposts';
  url = '/flashposts.html';
  createConfirmationToastText = 'Flashpost created successfully';
  deleteConfirmationToastText = 'Flashpost deleted successfully';
  createFlashpostButton = this.page.getByRole('button', {
    name: 'Create Flashpost'
  });
  submitFlashpostButton = this.page.getByRole('button', {
    name: 'Create',
    exact: true
  });
  formInput = this.page.locator('textarea[id="flashpost-text"]');
  isPublicCheckbox = this.page.locator('input[type="checkbox"]');
  colorPicker = this.page.locator('input[type="color"]');
  confirmationToast = this.page.getByTestId('dti-simple-alert');
  newestFlashpost = this.page.locator('div.flashpost-message').first();
  newestFlashPostPrivateIcon = this.newestFlashpost.locator('i.fa-lock');
  newestFlashPostPublicIcon = this.newestFlashpost.locator('i.fa-globe');
  deleteNewestFlashpostButton = this.page.locator('i.fa-trash-can').first();

  async fillFlashpostForm(flashpost): Promise<void> {
    await this.formInput.fill(flashpost.body);
    await this.colorPicker.fill(flashpost.color);

    if (flashpost.isPublic) {
      await this.isPublicCheckbox.check();
    }
  }
}

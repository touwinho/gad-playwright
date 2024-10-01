import { Locator, Page } from '@playwright/test';
import { IFlashpost } from '@interfaces/flashpost';

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
  publicFlashpostIconClass = 'fa-solid fa-globe';
  privateFlashpostIconClass = 'fa-solid fa-lock';
  formInput = this.page.locator('textarea[id="flashpost-text"]');
  isPublicCheckbox = this.page.locator('input[type="checkbox"]');
  colorPicker = this.page.locator('input[type="color"]');
  confirmationToast = this.page.getByTestId('dti-simple-alert');

  locatePostByText(text: string): Locator {
    return this.page.locator('div.flashpost-message', { hasText: text });
  }

  locateVisibilityIconByText(text: string): Locator {
    return this.locatePostByText(text)
      .locator('..')
      .locator('.flashpost-visibility > i');
  }

  locateTrashIconByText(text: string): Locator {
    return this.locatePostByText(text).locator('..').locator('i.fa-trash-can');
  }

  async fillFlashpostForm(flashpost: IFlashpost): Promise<void> {
    await this.formInput.fill(flashpost.body);
    await this.colorPicker.fill(flashpost.color);

    if (flashpost.isPublic) {
      await this.isPublicCheckbox.check();
    }
  }
}

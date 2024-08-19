import { Page, Locator } from '@playwright/test';

export class Notifications {
  readonly alertPopup: Locator;

  constructor(private page: Page) {
    this.alertPopup = this.page.getByTestId('alert-popup');
  }
}

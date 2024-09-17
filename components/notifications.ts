import { Page } from '@playwright/test';

export class Notifications {
  constructor(private page: Page) {}

  alertPopup = this.page.getByTestId('alert-popup');
}

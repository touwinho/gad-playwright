import { Locator } from '@playwright/test';

export interface IFlashpost {
  body: string;
  color: string;
  isPublic: boolean;
  icon: Locator;
}

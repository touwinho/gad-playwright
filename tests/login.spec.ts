import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByText('Welcome on 🦎GUI API Demo')).toBeVisible();
});

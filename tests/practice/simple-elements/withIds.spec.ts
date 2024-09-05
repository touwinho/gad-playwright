import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { hexToRgb } from '../../../helpers/hexToRgb';

test.describe('Elements with ID and data-testid attributes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice/simple-elements.html');
  });

  test('should have label', async ({ page }) => {
    await expect(page.getByTestId('dti-label-element')).toHaveText(
      'Some text for label'
    );
  });

  test('should have button', async ({ page }) => {
    await page.getByTestId('dti-button-element').click();

    await expect(page.getByTestId('dti-results')).toHaveText(
      'You clicked the button!'
    );
  });

  test('should have checkbox', async ({ page }) => {
    await page.getByTestId('dti-checkbox').check();
    await expect(page.getByTestId('dti-results')).toHaveText(
      'Checkbox is checked!'
    );

    await page.getByRole('checkbox').uncheck();
    await expect(page.getByTestId('dti-results')).toHaveText(
      'Checkbox is unchecked!'
    );
  });

  test('should have input', async ({ page }) => {
    await page.getByTestId('dti-input').fill('input test');
    await page.getByTestId('dti-input').blur();

    await expect(page.getByTestId('dti-results')).toHaveText(
      'Input value changed to: input test'
    );
  });

  test('should have textarea', async ({ page }) => {
    await page.getByTestId('dti-textarea').fill('textarea test');
    await page.getByTestId('dti-textarea').blur();

    await expect(page.getByTestId('dti-results')).toHaveText(
      'Textarea value changed to: textarea test'
    );
  });

  test('should have dropdown', async ({ page }) => {
    await page.getByTestId('dti-dropdown').selectOption('option2');
    await expect(page.getByTestId('dti-results')).toHaveText(
      'Selected option: option2'
    );

    await page.getByTestId('dti-dropdown').selectOption('option3');
    await expect(page.getByTestId('dti-results')).toHaveText(
      'Selected option: option3'
    );

    await page.getByTestId('dti-dropdown').selectOption('option1');
    await expect(page.getByTestId('dti-results')).toHaveText(
      'Selected option: option1'
    );
  });

  test('should have radio-buttons', async ({ page }) => {
    await page.getByRole('radio').first().check();
    await expect(page.getByTestId('dti-results')).toHaveText(
      'Radio Button 1 clicked!'
    );

    await page.getByRole('radio').nth(1).check();
    await expect(page.getByTestId('dti-results')).toHaveText(
      'Radio Button 2 clicked!'
    );

    await page.getByRole('radio').nth(2).check();
    await expect(page.getByTestId('dti-results')).toHaveText(
      'Radio Button 3 clicked!'
    );
  });

  test('should have range', async ({ page }) => {
    const randomNumber = faker.number.int({ min: 0, max: 100 });
    await page.getByRole('slider').fill(randomNumber.toString());
    await expect(page.getByTestId('dti-results')).toHaveText(
      `Range value changed to: ${randomNumber}`
    );
  });

  test('should have hovering label', async ({ page }) => {
    await page.getByTestId('dti-tooltip-element').hover();
    await expect(page.getByTestId('dti-results')).toHaveText(
      'Mouse over event occurred!'
    );
  });

  test('should have hovering datepicker', async ({ page }) => {
    const date = faker.date.anytime().toISOString().split('T')[0];
    await page.getByTestId('dti-date').fill(date);
    await expect(page.getByTestId('dti-results')).toHaveText(
      `Selected date: ${date}`
    );
  });

  test('should have hovering colorpicker', async ({ page }) => {
    const hexColor = faker.color.rgb();
    await page.getByTestId('dti-color').fill(hexColor);
    await expect(page.getByTestId('dti-results')).toContainText(
      `New selected color: ${hexColor} as hex and in RGB: ${hexToRgb(hexColor)}`
    );
  });
});

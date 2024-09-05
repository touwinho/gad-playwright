import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { hexToRgb } from '../../../helpers/hexToRgb';
import { SimpleElementsPage } from '../../../pages/practice';

test.describe('Elements with ID and data-testid attributes', () => {
  let simpleElementsPage: SimpleElementsPage;

  test.beforeEach(async ({ page }) => {
    simpleElementsPage = new SimpleElementsPage(page);

    await page.goto(simpleElementsPage.withIdsUrl);
  });

  test('should have label', async () => {
    await expect(simpleElementsPage.label).toHaveText(
      simpleElementsPage.labelText
    );
  });

  test('should have button', async () => {
    await simpleElementsPage.button.click();

    await expect(simpleElementsPage.resultsBox).toHaveText(
      simpleElementsPage.buttonClickedConfirmation
    );
  });

  test('should have checkbox', async () => {
    await simpleElementsPage.checkbox.check();
    await expect(simpleElementsPage.resultsBox).toHaveText(
      simpleElementsPage.checkboxCheckedConfirmation
    );

    await simpleElementsPage.checkbox.uncheck();
    await expect(simpleElementsPage.resultsBox).toHaveText(
      simpleElementsPage.checkboxUncheckedConfirmation
    );
  });

  test('should have input', async () => {
    const randomText = faker.lorem.sentence();
    await simpleElementsPage.input.fill(randomText);
    await simpleElementsPage.input.blur();

    await expect(simpleElementsPage.resultsBox).toHaveText(
      simpleElementsPage.inputFilledConfirmation(randomText)
    );
  });

  test('should have textarea', async () => {
    const randomText = faker.lorem.sentence();
    await simpleElementsPage.textarea.fill(randomText);
    await simpleElementsPage.textarea.blur();

    await expect(simpleElementsPage.resultsBox).toHaveText(
      simpleElementsPage.textareaFilledConfirmation(randomText)
    );
  });

  test('should have dropdown', async () => {
    // Loop is reversed because picking first option is picked by default, it won't cause confirmation in results box
    for (let i = 2; i >= 0; i--) {
      const selectedOption = `option${i + 1}`;
      await simpleElementsPage.dropdown.selectOption(selectedOption);
      await expect(simpleElementsPage.resultsBox).toHaveText(
        simpleElementsPage.dropdownSelectedConfirmation(selectedOption)
      );
    }
  });

  test('should have radio-buttons', async () => {
    for (let i = 0; i <= 2; i++) {
      await simpleElementsPage.radioButtons[i].check();
      await expect(simpleElementsPage.resultsBox).toHaveText(
        simpleElementsPage.radioButtonSelectedConfirmation(i + 1)
      );
    }
  });

  test('should have range', async () => {
    const randomNumber = faker.number.int({ min: 0, max: 100 });
    await simpleElementsPage.rangeInput.fill(randomNumber.toString());
    await expect(simpleElementsPage.resultsBox).toHaveText(
      simpleElementsPage.rangeInputChangedConfirmation(randomNumber)
    );
  });

  test('should have hovering label', async () => {
    await simpleElementsPage.hoveredElement.hover();
    await expect(simpleElementsPage.resultsBox).toHaveText(
      simpleElementsPage.hoveredElementConfirmation
    );
  });

  test('should have datepicker', async () => {
    const date = faker.date.anytime().toISOString().split('T')[0];
    await simpleElementsPage.datepicker.fill(date);
    await expect(simpleElementsPage.resultsBox).toHaveText(
      simpleElementsPage.selectedDateConfirmation(date)
    );
  });

  test('should have colorpicker', async () => {
    const hexColor = faker.color.rgb();
    await simpleElementsPage.colorpicker.fill(hexColor);
    await expect(simpleElementsPage.resultsBox).toContainText(
      simpleElementsPage.selectedColorConfirmation(hexColor, hexToRgb(hexColor))
    );
  });
});

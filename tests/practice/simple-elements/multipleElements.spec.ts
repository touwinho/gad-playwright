import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

import { MultipleElements } from '../../../pages/practice/simple-elements';

test.describe('Multiple elements without any ID or data-testid attributes', () => {
  let simpleElementsPage: MultipleElements;

  test.beforeEach(async ({ page }) => {
    simpleElementsPage = new MultipleElements(page);
    await page.goto(simpleElementsPage.url);
  });

  test('should have label', async () => {
    await expect(simpleElementsPage.label).toHaveText(
      simpleElementsPage.labelText
    );
  });

  test('should have buttons', async () => {
    const buttonsCount = await simpleElementsPage.tableButtons.count();

    for (let i = 0; i < buttonsCount; i++) {
      const confirmationText = simpleElementsPage.buttonsClickedConfirmation(i);

      await simpleElementsPage.buttons[i].click();

      await expect(simpleElementsPage.resultsBox).toHaveText(confirmationText);
      const history = await simpleElementsPage.resultsHistoryBox.inputValue();
      expect(history).toContain(confirmationText);
    }
  });

  test('should have table with buttons', async () => {
    const tableButtonsCount = await simpleElementsPage.tableButtons.count();

    for (let i = 0; i < tableButtonsCount; i++) {
      const confirmationText =
        simpleElementsPage.tableButtonsClickedConfirmation(i);

      await simpleElementsPage.tableButtons.nth(i).click();

      await expect(simpleElementsPage.resultsBox).toHaveText(confirmationText);
      const history = await simpleElementsPage.resultsHistoryBox.inputValue();
      expect(history).toContain(confirmationText);
    }
  });

  test('should have checkboxes', async () => {
    const checkboxesCount = await simpleElementsPage.checkboxes.count();

    for (let i = 0; i < checkboxesCount; i++) {
      const confirmationText = {
        checked: simpleElementsPage.checkboxesCheckedConfirmation(i),
        unchecked: simpleElementsPage.checkboxesUncheckedConfirmation(i)
      };

      await simpleElementsPage.checkboxes.nth(i).check();
      await expect(simpleElementsPage.resultsBox).toHaveText(
        confirmationText.checked
      );

      await simpleElementsPage.checkboxes.nth(i).uncheck();
      await expect(simpleElementsPage.resultsBox).toHaveText(
        confirmationText.unchecked
      );

      const history = await simpleElementsPage.resultsHistoryBox.inputValue();
      expect(history).toContain(confirmationText.checked);
      expect(history).toContain(confirmationText.unchecked);
    }
  });

  test('should have inputs', async () => {
    const inputsCount = await simpleElementsPage.inputs.count();

    for (let i = 0; i < inputsCount; i++) {
      const randomText = faker.lorem.sentence();
      const confirmationText = simpleElementsPage.inputsFilledConfirmation(
        randomText,
        i
      );

      await simpleElementsPage.inputs.nth(i).fill(randomText);
      await simpleElementsPage.inputs.nth(i).blur();

      await expect(simpleElementsPage.resultsBox).toHaveText(confirmationText);
      const history = await simpleElementsPage.resultsHistoryBox.inputValue();
      expect(history).toContain(confirmationText);
    }
  });

  test('should have textareas', async () => {
    const textareasCount = await simpleElementsPage.textareas.count();

    for (let i = 0; i < textareasCount; i++) {
      const randomText = faker.lorem.sentence();
      const confirmationText = simpleElementsPage.textareasFilledConfirmation(
        randomText,
        i
      );

      await simpleElementsPage.textareas.nth(i).fill(randomText);
      await simpleElementsPage.textareas.nth(i).blur();

      await expect(simpleElementsPage.resultsBox).toHaveText(confirmationText);
      const history = await simpleElementsPage.resultsHistoryBox.inputValue();
      expect(history).toContain(confirmationText);
    }
  });

  test('should have dropdowns', async () => {
    const dropdownsCount = await simpleElementsPage.dropdowns.count();

    for (let i = 0; i < dropdownsCount; i++) {
      // Loop (with j index) is reversed because picking first option is picked by default, it won't cause confirmation in results box
      for (let j = 2; j >= 0; j--) {
        const selectedOption = `option${j + 1}`;
        const confirmationText =
          simpleElementsPage.dropdownsSelectedConfirmation(selectedOption, i);

        await simpleElementsPage.dropdowns.nth(i).selectOption(selectedOption);

        await expect(simpleElementsPage.resultsBox).toHaveText(
          confirmationText
        );
        const history = await simpleElementsPage.resultsHistoryBox.inputValue();
        expect(history).toContain(confirmationText);
      }
    }
  });

  test('should have range inputs', async () => {
    const rangeInputsCount = await simpleElementsPage.rangeInputs.count();

    for (let i = 0; i < rangeInputsCount; i++) {
      const randomNumber = faker.number.int({ min: 0, max: 100 });
      const confirmationText =
        simpleElementsPage.rangeInputsChangedConfirmation(randomNumber, i);

      await simpleElementsPage.rangeInputs.nth(i).fill(randomNumber.toString());

      await expect(simpleElementsPage.resultsBox).toHaveText(confirmationText);
      const history = await simpleElementsPage.resultsHistoryBox.inputValue();
      expect(history).toContain(confirmationText);
    }
  });
});

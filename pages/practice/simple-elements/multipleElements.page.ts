import { Locator, Page } from '@playwright/test';

export class MultipleElements {
  readonly url = '/practice/simple-multiple-elements-no-ids.html';
  readonly labelText = 'Some text for label';
  readonly label: Locator;
  readonly buttons: Locator[];
  readonly tableButtons: Locator;
  readonly checkboxes: Locator;
  readonly inputs: Locator;
  readonly textareas: Locator;
  readonly dropdowns: Locator;
  readonly rangeInputs: Locator;
  readonly resultsBox: Locator;
  readonly resultsHistoryBox: Locator;

  constructor(private page: Page) {
    this.label = this.page.locator('label.my-label');
    this.buttons = ['Click me!', 'Click me too!', 'Click here!'].map((i) =>
      this.page.locator(`button:has-text("${i}")`)
    );
    this.tableButtons = this.page.locator(
      'table td button.my-button:has-text("Click!")'
    );
    this.checkboxes = this.page.locator('input[type="checkbox"]');
    this.inputs = this.page.locator('input[type="text"]');
    this.textareas = this.page.locator('td textarea');
    this.dropdowns = this.page.locator('select[name="name-dropdown"]');
    this.rangeInputs = this.page.locator('input[type="range"]');
    this.resultsBox = this.page.getByTestId('dti-results');
    this.resultsHistoryBox = this.page.locator(
      'textarea.results-history-container'
    );
  }

  buttonsClickedConfirmation(nth: number): string {
    switch (nth) {
      case 0:
        return 'You clicked the button!';
      case 1:
        return 'You clicked the button! (Second one!)';
      case 2:
        return 'You clicked the button! (Third one!)';
      default:
        return `You clicked the button!`;
    }
  }

  tableButtonsClickedConfirmation(nth: number): string {
    return `You clicked the button! (row ${nth + 1})`;
  }

  checkboxesCheckedConfirmation(nth: number): string {
    return `Checkbox is checked! (Opt ${nth + 1}!)`;
  }

  checkboxesUncheckedConfirmation(nth: number): string {
    return `Checkbox is unchecked! (Opt ${nth + 1}!)`;
  }

  inputsFilledConfirmation(value: string, nth: number): string {
    switch (nth) {
      case 0:
        return `Input value changed to: ${value}`;
      case 1:
        return `Input value changed to: ${value} (Second one!)`;
      case 2:
        return `Input value changed to: ${value} (Third one!)`;
      default:
        return `Input value changed to: ${value}`;
    }
  }

  textareasFilledConfirmation(value: string, nth: number): string {
    switch (nth) {
      case 0:
        return `Textarea value changed to: ${value}`;
      case 1:
        return `Textarea value changed to: ${value} (Second one!)`;
      default:
        return `Textarea value changed to: ${value}`;
    }
  }

  dropdownsSelectedConfirmation(value: string, nth: number): string {
    switch (nth) {
      case 0:
        return `Selected option: ${value}`;
      case 1:
        return `Selected option: ${value} (Second one!)`;
      case 2:
        return `Selected option: ${value} (Third one!)`;
      default:
        return `Selected option: ${value}`;
    }
  }

  rangeInputsChangedConfirmation(value: number, nth: number): string {
    switch (nth) {
      case 0:
        return `Range value changed to: ${value}`;
      case 1:
        return `Range value changed to: ${value} (Second one!)`;
      default:
        return `Range value changed to: ${value}`;
    }
  }
}

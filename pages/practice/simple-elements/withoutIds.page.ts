import { Locator, Page } from '@playwright/test';

export class WithoutIds {
  readonly url = '/practice/simple-elements-no-ids.html';
  readonly labelText = 'Some text for label';
  readonly buttonClickedConfirmation = 'You clicked the button!';
  readonly checkboxCheckedConfirmation = 'Checkbox is checked!';
  readonly checkboxUncheckedConfirmation = 'Checkbox is unchecked!';
  readonly hoveredElementConfirmation = 'Mouse over event occurred!';
  readonly label: Locator;
  readonly button: Locator;
  readonly checkbox: Locator;
  readonly input: Locator;
  readonly textarea: Locator;
  readonly dropdown: Locator;
  readonly radioButtons: Locator[];
  readonly rangeInput: Locator;
  readonly hoveredElement: Locator;
  readonly datepicker: Locator;
  readonly colorpicker: Locator;
  readonly resultsBox: Locator;

  constructor(private page: Page) {
    this.label = this.page.locator('label.my-label');
    this.button = this.page.locator('button.my-button');
    this.checkbox = this.page.getByRole('checkbox');
    this.input = this.page.locator('input.my-input');
    this.textarea = this.page.locator('textarea');
    this.dropdown = this.page.locator('[name="name-dropdown"]');
    this.radioButtons = [1, 2, 3].map((i) =>
      this.page.locator(`input[value="radio${i}"]`)
    );
    this.rangeInput = this.page.locator('input[type="range"]');
    this.hoveredElement = this.page.locator(
      'label:has-text("Hoover mouse here!")'
    );
    this.datepicker = this.page.locator('input[type="date"]');
    this.colorpicker = this.page.locator('input[type="color"]');
    this.resultsBox = this.page.locator('div#results-container');
  }

  inputFilledConfirmation(value: string): string {
    return `Input value changed to: ${value}`;
  }

  textareaFilledConfirmation(value: string): string {
    return `Textarea value changed to: ${value}`;
  }

  dropdownSelectedConfirmation(value: string): string {
    return `Selected option: ${value}`;
  }

  radioButtonSelectedConfirmation(value: number): string {
    return `Radio Button ${value} clicked!`;
  }

  rangeInputChangedConfirmation(value: number): string {
    return `Range value changed to: ${value}`;
  }

  selectedDateConfirmation(value: string): string {
    return `Selected date: ${value}`;
  }

  selectedColorConfirmation(value: string, rgbValue: string): string {
    return `New selected color: ${value} as hex and in RGB: ${rgbValue}`;
  }
}

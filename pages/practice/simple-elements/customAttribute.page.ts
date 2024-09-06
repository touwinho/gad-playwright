import { Locator, Page } from '@playwright/test';

export class CustomAttribute {
  readonly url = '/practice/simple-elements-custom-attribute.html';
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
  readonly datepicker: Locator;
  readonly colorpicker: Locator;
  readonly resultsBox: Locator;

  constructor(private page: Page) {
    this.label = this.page.locator('[pw-test="simple-label"]');
    this.button = this.page.locator('[pw-test="simple-button"]');
    this.checkbox = this.page.locator('[pw-test="simple-checkbox"]');
    this.input = this.page.locator('[pw-test="simple-input"]');
    this.textarea = this.page.locator('[pw-test="simple-textarea"]');
    this.dropdown = this.page.locator('[pw-test="simple-dropdown"]');
    this.radioButtons = [1, 2, 3].map((i) =>
      this.page.locator(`[pw-test="simple-radio${i}"]`)
    );
    this.rangeInput = this.page.locator('[pw-test="simple-range"]');
    this.datepicker = this.page.locator('[pw-test="simple-date"]');
    this.colorpicker = this.page.locator('[pw-test="simple-color"]');
    this.resultsBox = this.page.locator('[pw-test="results"]');
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

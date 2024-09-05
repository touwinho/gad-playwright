import { Locator, Page } from '@playwright/test';

export class SimpleElementsPage {
  readonly withIdsUrl = '/practice/simple-elements.html';
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
  readonly radioButton1: Locator;
  readonly radioButton2: Locator;
  readonly radioButton3: Locator;
  readonly rangeInput: Locator;
  readonly hoveredElement: Locator;
  readonly datepicker: Locator;
  readonly colorpicker: Locator;
  readonly resultsBox: Locator;

  constructor(private page: Page) {
    this.label = this.page.getByTestId('dti-label-element');
    this.button = this.page.getByTestId('dti-button-element');
    this.checkbox = this.page.getByTestId('dti-checkbox');
    this.input = this.page.getByTestId('dti-input');
    this.textarea = this.page.getByTestId('dti-textarea');
    this.dropdown = this.page.getByTestId('dti-dropdown');
    this.radioButton1 = this.page.getByTestId('dti-radio1');
    this.radioButton2 = this.page.getByTestId('dti-radio2');
    this.radioButton3 = this.page.getByTestId('dti-radio3');
    this.rangeInput = this.page.getByTestId('dti-range');
    this.hoveredElement = this.page.getByTestId('dti-tooltip-element');
    this.datepicker = this.page.getByTestId('dti-date');
    this.colorpicker = this.page.getByTestId('dti-color');
    this.resultsBox = this.page.getByTestId('dti-results');
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

  radioButtonSelector(value: number): Locator {
    return this.page.getByTestId(`dti-radio${value}`);
  }

  radioButtonSelectedConfirmation(value: number): string {
    return `Radio Button ${value} clicked!`;
  }

  rangeInputChangedConfirmation(value: number): string {
    return `Range value changed to: ${value}`;
  }

  selectedDateConirmation(value: string): string {
    return `Selected date: ${value}`;
  }

  selectedColorConfitmation(value: string, rgbValue: string): string {
    return `New selected color: ${value} as hex and in RGB: ${rgbValue}`;
  }
}

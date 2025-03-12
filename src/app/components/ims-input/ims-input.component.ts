import {Component, ElementRef, forwardRef, Input, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'ims-input',
  templateUrl: './ims-input.component.html',
  styleUrls: ['./ims-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImsInputComponent),
      multi: true
    }
  ]
})
export class ImsInputComponent implements ControlValueAccessor {

  @ViewChild('inputEl', {static: true}) inputEl!: ElementRef<HTMLInputElement>;
  _formattedValue: string = '';
  errorMessage: string | null = null;
  currencySymbol: string = '';
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  private _value: string = '';

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this._value = value ?? '';
    this.validateValue();
    this._formattedValue = this.formatNumber(this._value);
    this.inputEl.nativeElement.value = this._formattedValue;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(target: HTMLInputElement): void {
    // Save the current (formatted) value and caret position.
    const oldFormatted = this._formattedValue;
    const oldCaret = target.selectionStart || 0;

    // Remove commas so we can work with the raw value.
    let rawValue = target.value.replace(/,/g, '');
    // Allow incomplete but potentially valid inputs like '-', '123.' etc.
    if (/^-?\d*\.?\d*$/.test(rawValue)) {
      this._value = rawValue;
      this.validateValue();
      this.onChange(this._value);

      // Compute new formatted value.
      const newFormatted = this.formatNumber(this._value);
      // Store new formatted value.
      this._formattedValue = newFormatted;

      const nativeInput = this.inputEl.nativeElement;
      const currentVal = nativeInput.value;

      // Only update if something has changed.
      if (currentVal !== newFormatted) {
        // Compute minimal diff update to preserve undo/redo history.
        let prefixLength = 0;
        while (
            prefixLength < currentVal.length &&
            prefixLength < newFormatted.length &&
            currentVal[prefixLength] === newFormatted[prefixLength]
            ) {
          prefixLength++;
        }
        let suffixLength = 0;
        while (
            suffixLength < currentVal.length - prefixLength &&
            suffixLength < newFormatted.length - prefixLength &&
            currentVal[currentVal.length - 1 - suffixLength] === newFormatted[newFormatted.length - 1 - suffixLength]
            ) {
          suffixLength++;
        }
        // Replace only the changed portion.
        nativeInput.setRangeText(
            newFormatted.substring(prefixLength, newFormatted.length - suffixLength),
            prefixLength,
            currentVal.length - suffixLength,
            "preserve"
        );
      }
      // Calculate new caret: shift by the difference in total length.
      let newCaret = oldCaret + (newFormatted.length - oldFormatted.length);
      newCaret = Math.max(0, Math.min(newCaret, newFormatted.length));
      nativeInput.setSelectionRange(newCaret, newCaret);
    } else {
      // If the raw value doesn't match our allowed pattern, revert.
      target.value = oldFormatted;
      target.setSelectionRange(oldCaret, oldCaret);
    }
  }

  // Prevent disallowed keys while still allowing dot, minus, digits, and navigation keys.
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'
    ];

    // Allow any key when modifier is pressed (for copy/paste, undo/redo, etc.)
    if (event.ctrlKey || event.metaKey) {
      return;
    }
    if (allowedKeys.indexOf(event.key) !== -1) {
      return;
    }
    // Allow digits 0-9.
    if (/^\d$/.test(event.key)) {
      return;
    }
    // Allow one dot if not already present.
    if (event.key === '.' && !this._value.includes('.')) {
      return;
    }
    // Allow minus only at the very start if not already present.
    if (event.key === '-' && this.inputEl.nativeElement.selectionStart === 0 && !this._value.includes('-')) {
      return;
    }
    // Otherwise, prevent the key.
    event.preventDefault();
  }

  // Formats the raw number by inserting commas into the integer part.
  // If the value is incomplete (e.g. '-' or ending with a dot), it returns the value as is.
  private formatNumber(value: string): string {
    if (
        value === '' ||
        value === '-' ||
        value === '.' ||
        value === '-.'
    ) {
      return value;
    }
    const parts = value.split('.');
    let integerPart = parts[0];
    const fractionalPart = parts.length > 1 ? parts[1] : null;

    // Remove minus sign to format the number.
    let sign = '';
    if (integerPart.startsWith('-')) {
      sign = '-';
      integerPart = integerPart.substring(1);
    }
    // Format the integer part (if any) using locale formatting.
    const formattedInteger = integerPart ? Number(integerPart).toLocaleString('en-US') : '';
    const result = sign + formattedInteger;
    // If the user has typed a dot, append it along with any fractional part.
    if (value.indexOf('.') !== -1) {
      return result + '.' + (fractionalPart !== null ? fractionalPart : '');
    }
    return result;
  }

  // Calculate the new caret position by counting non-comma characters.
  private calculateNewCaret(oldCaret: number, oldFormatted: string, newFormatted: string): number {
    // Count non-comma characters in the old formatted value up to the old caret position.
    const nonCommaCountBeforeCaret = oldFormatted.slice(0, oldCaret).length;
    // In the new formatted value, find the position where this count is reached.
    let count = 0;
    let newCaret = 0;
    for (let i = 0; i < newFormatted.length; i++) {
      // if (newFormatted[i] !== ',') {
        count++;
      // }
      if (count >= nonCommaCountBeforeCaret) {
        newCaret = count + 1;
        break;
      }
    }
    return newCaret;
  }

  private validateValue(): void {
    const num = Number(this._value);
    // Only validate if the value is nonempty and a valid number
    if (this._value !== '' && !isNaN(num)) {
      if (this.min !== null && num < this.min) {
        this.errorMessage = `Value must be at least ${this.min}`;
      } else if (this.max !== null && num > this.max) {
        this.errorMessage = `Value cannot exceed ${this.max}`;
      } else {
        this.errorMessage = null;
      }
    } else {
      this.errorMessage = null;
    }
  }

}

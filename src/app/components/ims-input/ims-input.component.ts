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

  onInput(): void {
    const target = this.inputEl.nativeElement;

    // Save the current (formatted) value and caret position.
    const oldFormatted = this._formattedValue;
    const oldCaret = target.selectionStart || 0;

    // Remove commas so we can work with the raw value.
    let rawValue = target.value.replace(/,/g, '');

    // Auto-prepend zero if the value starts with a dot,
    // or if it starts with '-.' then prepend zero after the minus.
    if (rawValue.startsWith('.')) {
      rawValue = '0' + rawValue;
    } else if (rawValue.startsWith('-.')) {
      rawValue = '-0.' + rawValue.slice(2);
    }

    // Allow incomplete but potentially valid inputs like '-', '123.' etc.
    if (/^-?\d*\.?\d*$/.test(rawValue)) {
      this._value = rawValue;
      this.validateValue();
      this.onChange(this._value);

      // Compute new formatted value.
      const newFormatted = this.formatNumber(this._value);
      // Store new formatted value.
      this._formattedValue = newFormatted;

      const currentVal = target.value;

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
        target.setRangeText(
            newFormatted.substring(prefixLength, newFormatted.length - suffixLength),
            prefixLength,
            currentVal.length - suffixLength,
            "preserve"
        );
      }

      // Update caret position using the extracted method.
      this.updateCaretPosition(oldFormatted, newFormatted, oldCaret);
    } else {
      // If the raw value doesn't match allowed pattern, revert.
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

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    if (!clipboardData) {
      return;
    }
    let pastedText = clipboardData.getData('text').trim();
    // Remove commas from the pasted text.
    pastedText = pastedText.replace(/,/g, '');
    // Validate the pasted text.
    if (!/^-?\d*\.?\d*$/.test(pastedText)) {
      // If not valid, do not paste.
      return;
    }

    const target = this.inputEl.nativeElement;
    const start = target.selectionStart || 0;
    const end = target.selectionEnd || 0;

    // Get the raw current value (without commas).
    const currentRawValue = target.value.replace(/,/g, '');
    // Insert the sanitized pasted text at the selection.
    const newRawValue = currentRawValue.slice(0, start) + pastedText + currentRawValue.slice(end);

    // Update internal value and notify.
    this._value = newRawValue;
    this.validateValue();
    this.onChange(this._value);
    const newFormatted = this.formatNumber(this._value);
    this._formattedValue = newFormatted;
    target.value = newFormatted;

    // Calculate new caret position based on the raw caret index.
    const rawCaretIndex = start + pastedText.length;
    let newCaret = 0;
    let count = 0;
    for (let i = 0; i < newFormatted.length; i++) {
      if (newFormatted[i] !== ',') {
        count++;
      }
      if (count >= rawCaretIndex) {
        newCaret = i + 1;
        break;
      }
    }
    target.setSelectionRange(newCaret, newCaret);
  }

  onCopy(event: ClipboardEvent): void {
    event.preventDefault();
    if (event.clipboardData) {
      // Set raw value (without commas) in clipboard.
      event.clipboardData.setData('text/plain', this._value);
    }
  }

  private updateCaretPosition(oldFormatted: string, newFormatted: string, oldCaret: number): void {
    // Calculate comma shift.
    let commaShift = newFormatted.length - oldFormatted.length;
    if (commaShift > 1) {
      commaShift = 1;
    } else if (commaShift < -1) {
      commaShift = -1;
    } else {
      commaShift = 0;
    }
    let newCaret = oldCaret + commaShift;
    newCaret = Math.max(0, Math.min(newCaret, newFormatted.length));
    this.inputEl.nativeElement.setSelectionRange(newCaret, newCaret);
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

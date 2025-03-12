import {Directive, ElementRef, forwardRef, HostListener} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
  selector: '[numberFormatter]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberFormatterDirective),
      multi: true
    }
  ]
})
export class NumberFormatterDirective {

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const numericValue = value.replace(/,/g, ''); // Remove commas for the actual value
    this._onChange(numericValue); // Update form control with the raw number
    this.el.nativeElement.value = this.formatNumber(numericValue); // Format displayed value
  }

  @HostListener('blur')
  onBlur() {
    this._onTouched();
  }

  writeValue(value: any): void {
    this.el.nativeElement.value = this.formatNumber(value);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  private formatNumber(value: string | number): string {
    if (!value) return '';
    return Number(value).toLocaleString();
  }

}

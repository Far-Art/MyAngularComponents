import {Component, ContentChildren, ElementRef, HostListener, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {OptionComponent} from './option/option.component';
import {NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {ControlValueAccessor} from '@angular/forms';


@Component({
  selector: 'ims-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  imports: [
    NgIf,
    NgForOf,
    NgTemplateOutlet
  ],
  standalone: true
})
export class SelectComponent implements ControlValueAccessor {

  @ContentChildren(OptionComponent) options!: QueryList<OptionComponent>;
  @ViewChild('selectButton', {static: true}) selectButton!: ElementRef<HTMLButtonElement>;
  @ViewChildren('optionItem') optionItems!: QueryList<ElementRef<HTMLLIElement>>;

  @Input() placeholder: string = 'Select an option';
  @Input() label: string = 'Custom Select';

  isOpen: boolean = false;
  selectedOption: OptionComponent | null = null;
  focusedElIdx = 0;

  constructor() { }

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.onTouched();
      setTimeout(() => this.setFocus());
    }
  }

  selectOption(option: OptionComponent) {
    this.selectedOption = option;
    this.isOpen = false;
    this.onChange(option.value);
    this.onTouched();
    setTimeout(() => this.setFocus());
  }

  @HostListener('keydown.Escape')
  onEsc() {
    if (this.isOpen) {
      this.isOpen = false;
      (document.activeElement as any)?.blur();
      setTimeout(() => this.selectButton.nativeElement.focus());
    } else {
      (document.activeElement as any)?.blur();
    }
  }

  @HostListener('keydown.ArrowUp', ['$event'])
  @HostListener('keydown.Tab', ['$event'])
  focusPrevEl(event: KeyboardEvent): void {
    event.preventDefault();
    if (this.isOpen && this.focusedElIdx === 0 && event.altKey && event.key === 'Tab') {
      this.selectButton.nativeElement.focus();
    } else if (this.isOpen && 0 < this.focusedElIdx) {
      if (event?.altKey && event.key === 'Tab' && this.optionItems.find(opt => opt.nativeElement === document.activeElement) || event?.key === 'ArrowUp') {
        this.focusedElIdx--;
        this.optionItems.get(this.focusedElIdx)?.nativeElement.focus();
      }
    }
  }

  @HostListener('keydown.ArrowDown', ['$event'])
  @HostListener('keydown.Tab', ['$event'])
  focusNextEl(event: KeyboardEvent): void {
    event.preventDefault();
    if (this.isOpen && this.optionItems.find(opt => opt.nativeElement === document.activeElement)) {
      if (this.optionItems.length - 1 > this.focusedElIdx) {
        this.focusedElIdx++;
        this.optionItems.get(this.focusedElIdx)?.nativeElement.focus();
      }
    }
  }

  writeValue(value: any): void {
    const option = this.options?.find(opt => opt.value === value);
    if (option) {
      this.selectOption(option);
    } else {
      this.selectedOption = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement
  }

  private setFocus() {
    if (this.isOpen) {
      this.updateFocusedOptionIndex();
      this.optionItems.get(this.focusedElIdx)?.nativeElement.focus();
    } else {
      this.selectButton.nativeElement.focus();
    }
  }

  private updateFocusedOptionIndex(): void {
    this.focusedElIdx = this.selectedOption ? [...this.options].findIndex(opt => opt === this.selectedOption) : 0;
  }
}

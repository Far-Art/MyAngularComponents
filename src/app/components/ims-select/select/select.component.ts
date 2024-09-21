import {Component, ContentChildren, ElementRef, HostListener, Input, QueryList, ViewChild} from '@angular/core';
import {OptionComponent} from './option/option.component';
import {NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {ControlValueAccessor} from '@angular/forms';


@Component({
  selector: 'fa-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  imports: [
    NgIf,
    NgForOf,
    NgTemplateOutlet
  ],
  standalone: true
})
export class SelectComponent implements ControlValueAccessor{

  @ContentChildren(OptionComponent) options!: QueryList<OptionComponent>;
  @ViewChild('selectButton', {static: true}) selectButton!: ElementRef<HTMLButtonElement>;

  @Input() placeholder: string = 'Select an option';
  @Input() label: string = 'Custom Select';

  isOpen: boolean = false;
  selectedOption: OptionComponent | null = null;

  constructor() { }

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.onTouched();
    }
  }

  selectOption(option: OptionComponent) {
    this.selectedOption = option;
    this.isOpen = false;
    this.onChange(option.value);
    this.onTouched();
  }

  @HostListener('keydown.ArrowUp')
  cycleUp(): void {
    console.log('up');
  }

  @HostListener('keydown.ArrowDown')
  cycleDown(): void {
    console.log('down');
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

}

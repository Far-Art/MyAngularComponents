import {AfterContentInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, ViewChild, ViewContainerRef} from '@angular/core';
import {OptionComponent} from './option/option.component';


@Component({
  selector: 'fa-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit, AfterContentInit {

  @ContentChildren(OptionComponent) options!: QueryList<OptionComponent>;
  @ViewChild('selectButton', {static: true}) selectButton!: ElementRef<HTMLButtonElement>;
  // @ViewChild('selectedContent', {
  //   read: ViewContainerRef,
  //   static: true
  // }) selectedContent!: ViewContainerRef;

  @Input() placeholder: string = 'Select an option';
  @Input() label: string = 'Custom Select';

  isOpen: boolean = false;
  selectedOption: OptionComponent | null = null;

  constructor() { }

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit(): void {
  }

  ngAfterContentInit() {
  }

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
    // Implement if needed
  }

}

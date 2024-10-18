import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  formattedDate: string = '__/__/____';

  dateConst = {
    day: {
      min: 1,
      max: 31,
      len: 2
    },
    month: {
      min: 1,
      max: 12,
      len: 2
    },
    year: {
      min: 1900,
      max: 2200,
      len: 4
    }
  }

  @ViewChild('dateInput', {static: true}) dateInput!: ElementRef<HTMLInputElement>;

  value: string | undefined = undefined;

  day: string = '__';
  month: string = '__';
  year: string = '____';

  constructor() { }

  ngOnInit(): void {

  }

  setValue(event: Event): void {

  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const typedChar = value.replace(/[_/]/g, '');
    const newChar = typedChar.charAt(typedChar.length - 1);

    if (newChar.length > 0) {
      // Replace the first underscore with the typed number
      this.formattedDate = this.formattedDate.replace(/_/, newChar);
      input.value = this.formattedDate;
    }
    input.value = this.formattedDate;
    this.setCaret();
  }

  setCaret(): void {
    const input = this.dateInput.nativeElement;
    const _index = this.formattedDate.indexOf('_');
    input.selectionStart

    if (_index !== -1) {
      input.setSelectionRange(_index, _index); // Move caret
    } else {
      // input.setSelectionRange(this.formattedDate.length, this.formattedDate.length); // Move caret to the end if no underscores are left
    }
  }

  onFocus(event: FocusEvent): void {
    event.preventDefault();
    this.setCaret();
  }

}

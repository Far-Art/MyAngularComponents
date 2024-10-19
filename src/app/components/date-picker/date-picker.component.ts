import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  formattedValue: string = '';
  readonly dateConfig = {
    day: {
      min: 1,
      max: 31,
      len: 2,
      start: 0,
      end: 2
    },
    month: {
      min: 1,
      max: 12,
      len: 2,
      start: 5,
      end: 7
    },
    year: {
      min: 1900,
      max: 2300,
      len: 4,
      start: 10,
      end: 14
    }
  } as const;

  @ViewChild('dateInput', {static: true}) dateInput!: ElementRef<HTMLInputElement>;

  value: string | null = null;
  private readonly dateFormat: string = '__ / __ / ____';
  private selectionStart = 0;
  private selectionEnd = 0;

  constructor() { }

  ngOnInit(): void {
    this.formattedValue = this.dateFormat;
  }

  setValue(event: Event): void {

  }

  onInput(event: InputEvent): void {
    if (event.inputType?.includes('delete')) {
      this.handleDelete(event);
    } else {
      this.handleInsert(event);
    }

  }

  setCaret(): void {
    const input = this.dateInput.nativeElement;
    // const _index = this.formattedDate.indexOf('_');

    // if (_index !== -1) {
    //   input.setSelectionRange(_index, _index); // Move caret
    // }
  }

  onFocus(event: FocusEvent): void {
    event.preventDefault();
    this.setCaret();
  }

  onSelectionChange(target: HTMLInputElement): void {
    this.selectionStart = target.selectionStart ?? 0;
    this.selectionEnd = target.selectionEnd ?? 0;
    // console.log('start:', this.selectionStart)
    // console.log('  end:', this.selectionEnd)
  }

  private handleInsert(event: InputEvent): void {
    this.updateFormatedValue(event);
    // this.setCaret();
  }

  private handleDelete(event: InputEvent): void {
  }

  private updateFormatedValue(event: InputEvent): void {
    const el = event.target as HTMLInputElement;
    console.log(el.placeholder);
    this.setDay(event)
    this.setMonth(event);
    this.setYear(event);
  }

  private setDay(event: Event): void {
    const value = this.getValue(event).substring(0, 2);
    if (+value >= this.dateConfig.day.min && +value <= this.dateConfig.day.max) {
      this.formattedValue = this.replaceRange(this.dateConfig.day.start, this.dateConfig.day.end, value);
    }
  }

  private setMonth(event: Event): void {
    const value = this.getValue(event).substring(2, 4);
    if (+value >= this.dateConfig.month.min && +value <= this.dateConfig.month.max) {
      this.formattedValue = this.replaceRange(this.dateConfig.month.start, this.dateConfig.month.end, value);
    }
  }

  private setYear(event: Event): void {
    const value = this.getValue(event).substring(4, 12);
    if (+value >= this.dateConfig.year.min && +value <= this.dateConfig.year.max) {
      this.formattedValue = this.replaceRange(this.dateConfig.year.start, this.dateConfig.year.end, value);
    }
  }

  private replaceRange(start: number, end: number, substitute: string): string {
    const endLen = substitute.length < end ? substitute.length : end;
    return this.formattedValue.substring(0, start) + substitute + this.formattedValue.substring(start + endLen);
  }

  private getValue(event: Event): string {
    const rawValue = (event.target as HTMLInputElement).value;
    return rawValue.replace(/\D/g, '');
  }

}

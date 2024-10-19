import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';


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

  value: string = '';
  private readonly dateFormat: string = '__ / __ / ____';
  private selectionStart = 0;
  private selectionEnd = 0;

  constructor() { }

  ngOnInit(): void {
    this.formattedValue = this.dateFormat;
  }

  setCaret(): void {
    const input = this.dateInput.nativeElement;
    const _index = this.formattedValue.indexOf('_');

    if (_index !== -1) {
      input.setSelectionRange(_index, _index); // Move caret
    }
    // console.log('start:', this.selectionStart)
    // console.log('  end:', this.selectionEnd)
  }

  onFocus(event: FocusEvent): void {
    event.preventDefault();
    this.setCaret();
  }

  onSelectionChange(target: HTMLInputElement): void {
    this.selectionStart = target.selectionStart ?? 0;
    this.selectionEnd = target.selectionEnd ?? 0;

    console.log(this.formattedValue[this.selectionStart - 1])

  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Enter', 'Delete', 'Home', 'End', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (event.key.match(/\D/) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Home' || event.key === 'End') {
      // TODO handle caret position on blank spaces
      if (event.key === 'End' || (event.key === 'ArrowRight' || event.key === 'ArrowLeft') && this.formattedValue.substring(this.selectionStart, this.selectionEnd + 1)?.match(/\D/)) {
        event.preventDefault();
        if (event.key === 'ArrowLeft') {
          this.dateInput.nativeElement.setSelectionRange(this.selectionStart - 3, this.selectionEnd - 3);
        } else {
          this.setCaret();
        }
      }
      return;
    }

    if (allowedKeys.includes(event.key)) {
      event.preventDefault();
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
      this.handleDelete(event.key);
      return;
    }

    if (event.key.match(/\d/)) {
      event.preventDefault();
      this.handleInsert(event.key);
    }

  }

  private handleInsert(key: string): void {
    // TODO only append to value if it is valid
    this.value += key;
    this.updateFormatedValue();
    this.setCaret();
  }

  private handleDelete(key: string): void {
    console.log('_'.repeat(1))
    console.log('delete')
    console.log(this.selectionStart)
    console.log(this.selectionEnd)
    this.setCaret();
  }

  private updateFormatedValue(): void {
    this.setDay()
    this.setMonth();
    this.setYear();
  }

  private setDay(): void {
    const value = this.value.substring(0, 2);
    if (this.validateDay(value)) {
      this.formattedValue = this.replaceRange(this.dateConfig.day.start, this.dateConfig.day.end, value);
    }
  }

  private setMonth(): void {
    const value = this.value.substring(2, 4);
    if (this.validateMonth(value)) {
      this.formattedValue = this.replaceRange(this.dateConfig.month.start, this.dateConfig.month.end, value);
    }
  }

  private setYear(): void {
    const value = this.value.substring(4, 12);
    if (this.validateYear(value)) {
      this.formattedValue = this.replaceRange(this.dateConfig.year.start, this.dateConfig.year.end, value);
    }
  }

  private replaceRange(start: number, end: number, substitute: string): string {
    const endLen = substitute.length < end ? substitute.length : end;
    return this.formattedValue.substring(0, start) + substitute + this.formattedValue.substring(start + endLen);
  }

  private validateDay(value: string): boolean {
    if (!value) return false;
    return +value[0] <= +`${this.dateConfig.day.max}`[0] && +value >= this.dateConfig.day.min && +value <= this.dateConfig.day.max;
  }

  private validateMonth(value: string): boolean {
    if (!value) return false;
    return +value[0] <= +`${this.dateConfig.month.max}`[0] && +value >= this.dateConfig.month.min && +value <= this.dateConfig.month.max;
  }

  private validateYear(value: string): boolean {
    if (!value) return false;
    return +value[0] <= +`${this.dateConfig.year.max}`[0] && +value >= this.dateConfig.year.min && +value <= this.dateConfig.year.max;
  }

}

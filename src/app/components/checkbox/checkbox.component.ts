import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';


@Component({
  selector: 'fa-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent<T = string> implements AfterViewInit {

  @ViewChild('checkboxElement', {static: true}) private checkbox!: ElementRef<HTMLInputElement>;

  @Input() value: T | null = null;

  @Output() isChecked = new EventEmitter<boolean>();

  onChange() {
    this.isChecked.emit(this.checkbox.nativeElement.checked);
  }

  ngAfterViewInit(): void {
    this.onChange();
  }

}

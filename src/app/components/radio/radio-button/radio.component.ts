import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'fa-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent<T = any> {

  @Input() name: string | null = null;
  @Input() value: T | null = null;
  @Output() onSelected = new EventEmitter<T | null>();

  constructor() {}

  onChange() {
    this.onSelected.emit(this.value);
  }

}

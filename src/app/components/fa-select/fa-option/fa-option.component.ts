import {Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';


@Component({
  selector: 'fa-option',
  templateUrl: './fa-option.component.html',
  styleUrls: ['./fa-option.component.scss']
})
export class FaOptionComponent<T = any> {

  @Input() value: T | null = null;
  @Output() clicked = new EventEmitter<T | null>();

  @HostListener('click')
  onClick() {
    this.clicked.emit(this.value);
  }
}


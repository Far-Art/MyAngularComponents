import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';


@Component({
  selector: 'fa-option',
  templateUrl: './fa-option.component.html',
  styleUrls: ['./fa-option.component.scss']
})
export class FaOptionComponent<T = any> implements AfterViewInit {

  @Input() value: T | null = null;
  @Output() clickEmitter = new EventEmitter<T | null>();
  @Output('htmlContent') htmlContentEmitter = new EventEmitter<string>();
  @Output('hover') hoverEmitter = new EventEmitter<void>();
  _isSelected = false;
  _isHighlighted = false;
  _htmlContent!: string;
  @ViewChild('buttonElement', {static: true}) private buttonElement!: ElementRef<HTMLButtonElement>;

  onClick() {
    this.clickEmitter.emit(this.value);
    this.htmlContentEmitter.emit(this._htmlContent);
  }

  ngAfterViewInit(): void {
    this._htmlContent = this.buttonElement.nativeElement.innerText;
  }
}


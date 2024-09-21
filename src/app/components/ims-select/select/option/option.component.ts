import {Component, ElementRef, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';


@Component({
  selector: 'fa-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  standalone: true
})
export class OptionComponent {
  // @ViewChild('content', {
  //   read: ViewContainerRef,
  //   static: true
  // }) viewContainer!: ViewContainerRef;

  @ViewChild('optionContent', {
    static: true
  }) content!: TemplateRef<HTMLElement>;

  @Input() value: any;

  constructor() { }

}

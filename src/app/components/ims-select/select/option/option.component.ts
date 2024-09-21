import {Component, Input, TemplateRef, ViewChild} from '@angular/core';


@Component({
  selector: 'fa-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent {
  @ViewChild('content', {static: true}) content!: TemplateRef<HTMLElement>;

  @Input() value: any;

  constructor() { }

}

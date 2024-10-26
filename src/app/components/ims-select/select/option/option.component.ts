import {Component, Input, TemplateRef, ViewChild} from '@angular/core';


@Component({
  selector: 'ims-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  standalone: true
})
export class OptionComponent {
  @ViewChild('optionContent', {static: true}) content!: TemplateRef<HTMLElement>;

  @Input() value: any;

  constructor() { }

}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'fa-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent<T = any> {

  @Input() value: T | null = null;

}

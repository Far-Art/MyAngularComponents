import {Component, Input} from '@angular/core';


@Component({
  selector: 'fa-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {

  @Input() name: string | null = null;

}

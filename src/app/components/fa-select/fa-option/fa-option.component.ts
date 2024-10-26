import {Component, HostBinding} from '@angular/core';


@Component({
  selector: 'fa-option',
  templateUrl: './fa-option.component.html',
  styleUrls: ['./fa-option.component.scss']
})
export class FaOptionComponent {

  @HostBinding('role') role = 'option';
  @HostBinding('tabindex') tabIndex = 0;
}


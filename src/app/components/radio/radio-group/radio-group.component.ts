import {AfterContentInit, Component, ContentChildren, HostBinding, Input, QueryList} from '@angular/core';
import {RadioComponent} from '../radio-button/radio.component';
import {IdGenerator} from '../../../utils/IdGenerator';


@Component({
  selector: 'fa-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent implements AfterContentInit {

  @Input() name: string = IdGenerator.generate();

  @ContentChildren(RadioComponent) radioButtons!: QueryList<RadioComponent>;

  @HostBinding('attr.group-name') hostName: string = `${this.name}-group`;

  ngAfterContentInit(): void {
    if (this.radioButtons?.length) {
      this.radioButtons.forEach(item => item.name = this.name);
    }
  }
}

import {Component, Host, HostBinding, OnInit} from '@angular/core';
import {ImsRowComponent} from "../ims-row/ims-row.component";

@Component({
  selector: 'ims-th',
  templateUrl: './ims-th.component.html',
  styleUrls: ['./ims-th.component.scss']
})
export class ImsThComponent implements OnInit {

  @HostBinding('attr.nested')
  nested: boolean = false;

  constructor(@Host() private row: ImsRowComponent) {
    this.nested = row.nested;
  }

  ngOnInit(): void {
  }

}

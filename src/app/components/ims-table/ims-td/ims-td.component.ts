import {Component, Host, HostBinding, OnInit} from '@angular/core';
import {ImsRowComponent} from "../ims-row/ims-row.component";

@Component({
  selector: 'ims-td',
  templateUrl: './ims-td.component.html',
  styleUrls: ['./ims-td.component.scss']
})
export class ImsTdComponent implements OnInit {

  @HostBinding('attr.nested')
  nested: boolean = false;

  constructor(@Host() private row: ImsRowComponent) {
    this.nested = row.nested;
  }

  ngOnInit(): void {
  }

}

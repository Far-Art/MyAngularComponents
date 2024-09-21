import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ImsTableComponent} from "../ims-table/ims-table.component";
import {ImsRowComponent} from "../ims-row/ims-row.component";

@Component({
  selector: 'ims-tbody',
  templateUrl: './ims-tbody.component.html',
  styleUrls: ['./ims-tbody.component.scss']
})
export class ImsTbodyComponent implements OnInit {

  @ViewChildren(ImsRowComponent) rows: QueryList<ElementRef<ImsRowComponent>> | undefined;

  constructor(private table: ImsTableComponent) {
  }

  ngOnInit(): void {
  }

}

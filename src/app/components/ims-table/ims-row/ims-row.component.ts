import {AfterViewInit, Component, ContentChild, Host, HostBinding, OnInit, Optional} from '@angular/core';
import {ImsTbodyComponent} from "../ims-tbody/ims-tbody.component";
import {ImsTheadComponent} from "../ims-thead/ims-thead.component";
import {ImsTableComponent} from "../ims-table/ims-table.component";

@Component({
  selector: 'ims-row',
  templateUrl: './ims-row.component.html',
  styleUrls: ['./ims-row.component.scss']
})
export class ImsRowComponent implements OnInit, AfterViewInit {

  @HostBinding('attr.elementType')
  elementType: ElementType = 'NONE';

  @HostBinding('attr.nested')
  nested: boolean = false;

  @ContentChild(ImsTableComponent, {static: true})
  table: ImsTableComponent | undefined;

  constructor(@Optional() private head: ImsTheadComponent,
              @Optional() private body: ImsTbodyComponent,
              @Host() private tableParent: ImsTableComponent) {
    if (this.head) {
      this.elementType = 'ROW-HEADER';
    } else if (this.body) {
      this.elementType = 'ROW-DATA';
    }

    this.nested = tableParent.nested;
  }

  ngOnInit(): void {
    if (this.table) {
      this.elementType = 'ROW-TABLE';
      this.nested = true;
    }

  }

  ngAfterViewInit(): void {

  }

}

export type ElementType = 'ROW-HEADER' | 'ROW-DATA' | 'ROW-TABLE' | 'NONE';

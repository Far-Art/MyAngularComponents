import {AfterContentInit, Component, HostBinding, OnInit, Optional, SkipSelf} from '@angular/core';


@Component({
  selector: 'fa-collapsible-table-row',
  templateUrl: './collapsible-table-row.component.html',
  styleUrls: ['./collapsible-table-row.component.scss']
})
export class CollapsibleTableRowComponent implements OnInit, AfterContentInit {

  // @ContentChildren(CollapsibleTableRowComponent) rowsQueryList!: QueryList<CollapsibleTableRowComponent>;

  @HostBinding('attr.nested-table-row') isNested: null | '' = null;

  constructor(@Optional() @SkipSelf() parentRow: CollapsibleTableRowComponent) {
    if (parentRow) {
      this.isNested = '';
    }
  }

  ngOnInit(): void {
    // if (!this.rows) {
    //   this.rows
    // }
  }

  ngAfterContentInit(): void {
    // this.rows = this.rowsQueryList.toArray();
    // console.log(this.rows.length);
  }

}

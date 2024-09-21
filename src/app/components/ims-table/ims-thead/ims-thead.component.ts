import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ImsTableComponent} from "../ims-table/ims-table.component";
import {ImsRowComponent} from "../ims-row/ims-row.component";

@Component({
  selector: 'ims-thead',
  templateUrl: './ims-thead.component.html',
  styleUrls: ['./ims-thead.component.scss']
})
export class ImsTheadComponent implements OnInit, AfterViewInit {

  @ViewChild(ImsRowComponent) row: ElementRef<ImsRowComponent> | undefined;

  constructor(private table: ImsTableComponent) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}

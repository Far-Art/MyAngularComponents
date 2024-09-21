import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Optional,
  QueryList,
  SkipSelf,
  ViewChildren
} from '@angular/core';
import {ImsTheadComponent} from "../ims-thead/ims-thead.component";
import {ImsTbodyComponent} from "../ims-tbody/ims-tbody.component";

@Component({
  selector: 'ims-table',
  templateUrl: './ims-table.component.html',
  styleUrls: ['./ims-table.component.scss']
})
export class ImsTableComponent implements OnInit, AfterViewInit {

  readonly nested: boolean;

  // @ViewChildren(ImsTheadComponent)
  // theads: QueryList<ElementRef> | undefined;
  //
  // @ViewChildren(ImsTbodyComponent)
  // tbodies: QueryList<ElementRef> | undefined;

  @Input() name: string | undefined;

  constructor(@Optional() @SkipSelf() private table: ImsTableComponent) {
    this.nested = this.table != null;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}

import {Component, OnDestroy, TemplateRef, ViewChild} from '@angular/core';


@Component({
  selector: 'fa-collapsible-container-body',
  templateUrl: './collapsible-container-body.component.html',
  styleUrls: ['./collapsible-container-body.component.scss']
})
export class CollapsibleContainerBodyComponent implements OnDestroy {

  @ViewChild(TemplateRef) template!: TemplateRef<any>;

  ngOnDestroy(): void {
    console.log('body destroy')
  }

}

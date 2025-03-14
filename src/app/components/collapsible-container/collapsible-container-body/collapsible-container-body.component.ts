import {AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';


@Component({
  selector: 'fa-collapsible-container-body',
  templateUrl: './collapsible-container-body.component.html',
  styleUrls: ['./collapsible-container-body.component.scss']
})
export class CollapsibleContainerBodyComponent implements OnDestroy{

  @ViewChild('bodyTemplate', {static: true}) bodyTemplate!: TemplateRef<any>;
  @ViewChild('bodyContainer', {read: ViewContainerRef, static: true}) bodyContainer!: ViewContainerRef;


  updateBodyView(collapse: boolean) {
    if (collapse) {
      // Destroy the content view. This will trigger ngOnDestroy in any components inside.
      this.bodyContainer.clear();
    } else {
      // Re-create the content view, triggering ngOnInit in the projected components.
      if (!this.bodyContainer.length) {
        this.bodyContainer.createEmbeddedView(this.bodyTemplate);
      }
    }
  }

  ngOnDestroy(): void {
    console.log('body destroy')
  }

}

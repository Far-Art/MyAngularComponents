import {Component, TemplateRef, ViewChild} from '@angular/core';


@Component({
  selector: 'fa-collapsible-container-body',
  templateUrl: './collapsible-container-body.component.html',
  styleUrls: ['./collapsible-container-body.component.scss']
})
export class CollapsibleContainerBodyComponent {

  @ViewChild('bodyTemplate', { static: true }) template!: TemplateRef<unknown>;

}

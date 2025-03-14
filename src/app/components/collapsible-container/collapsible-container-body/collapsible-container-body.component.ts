import {Component, ElementRef, Self} from '@angular/core';


@Component({
  selector: 'fa-collapsible-container-body',
  templateUrl: './collapsible-container-body.component.html',
  styleUrls: ['./collapsible-container-body.component.scss']
})
export class CollapsibleContainerBodyComponent {

  constructor(@Self() private _elRef: ElementRef<HTMLElement>) {}

  get elRef(): ElementRef<HTMLElement> {
    return this._elRef;
  }

}

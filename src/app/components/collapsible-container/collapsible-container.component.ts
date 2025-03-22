import {AfterViewInit, Component, ContentChild, EventEmitter, Input, Optional, Output, SkipSelf, TemplateRef} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'fa-collapsible-container',
  templateUrl: './collapsible-container.component.html',
  styleUrls: ['./collapsible-container.component.scss'],
  animations: [
    // onContainerInit disables collapse/expand animation on first render to prevent unnecessary view jumping
    trigger('onContainerInit', [transition(':enter', [])]),
    trigger(
        'expandCollapse',
        [
          transition(
              ':enter',
              [
                style({height: '0'}),
                animate(180, style({height: '*'}))
              ]
          ),
          transition(
              ':leave',
              [
                style({height: '*'}),
                animate(180, style({height: '0'}))
              ]
          )
        ]
    ),
    // TODO pay attention to true/ false values
    trigger('verticalLineRotate', [
      state('true', style({transform: 'rotateZ(90deg)'})),
      state('false', style({transform: 'rotateZ(180deg)'})),
      transition(
          ':enter',
          [
            style({transform: 'rotateZ(90deg)'}),
            animate(180, style({transform: 'rotateZ(180deg)'}))
          ]
      ),
      transition(
          ':leave',
          [
            style({transform: 'rotateZ(180deg)'}),
            animate(180, style({transform: 'rotateZ(90deg)'}))
          ]
      ),
      transition('* => true', animate(180)),
      transition('* => false', animate(180))
    ]),

    trigger('horizontalLineRotate', [
      state('true', style({transform: 'rotateZ(-180deg)'})),
      state('false', style({transform: 'rotateZ(0deg)'})),
      transition(
          ':enter',
          [
            style({transform: 'rotateZ(-180deg)'}),
            animate(180, style({transform: 'rotateZ(0deg)'}))
          ]
      ),
      transition(
          ':leave',
          [
            style({transform: 'rotateZ(-180deg)'}),
            animate(180, style({transform: 'rotateZ(0deg)'}))
          ]
      ),
      transition('* => true', animate(180)),
      transition('* => false', animate(180))
    ])
  ]
})
export class CollapsibleContainerComponent implements AfterViewInit {

  @ContentChild(TemplateRef, {static: true}) public templateRef!: TemplateRef<unknown>;

  @Input() invalid: boolean = false;
  @Input() disabled: boolean = false;
  public readonly isNested: boolean;
  public readonly nestingLevel: number;
  @Input('collapsed') isCollapsed!: boolean;
  @Output() collapsedChange = new EventEmitter<boolean>();
  @Input() title?: string;
  @Input() propagateState = false;
  private readonly childList: CollapsibleContainerComponent[] = [];

  constructor(@Optional() @SkipSelf() private parent: CollapsibleContainerComponent) {
    this.isNested = parent != null;
    this.nestingLevel = this.parent?.nestingLevel + 1 || 0;
    this.isCollapsed = this.isNested;
    if (this.isNested) {
      this.parent.childList.push(this);
    }
  }

  switchState() {
    this.setState(!this.isCollapsed);
  }

  ngAfterViewInit() {
    if (this.isCollapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  private setState(isCollapsed: boolean) {
    if (!this.disabled) {
      isCollapsed ? this.collapse() : this.expand();
    }
  }

  private expand() {
    this.isCollapsed = false;
    if (this.propagateState) {
      this.childList.forEach(child => child.expand());
    }
    this.collapsedChange.emit(this.isCollapsed);
  }

  private collapse() {
    this.isCollapsed = true;
    if (this.propagateState) {
      this.childList.forEach(child => child.collapse());
    }
    this.collapsedChange.emit(this.isCollapsed);
  }

}

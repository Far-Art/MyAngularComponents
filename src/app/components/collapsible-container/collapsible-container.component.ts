import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  SkipSelf
} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

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
export class CollapsibleContainerComponent implements OnInit, OnChanges, AfterViewInit, DoCheck, OnDestroy, AfterViewChecked {

  isCollapsedState: boolean;
  private readonly childList: CollapsibleContainerComponent[] = [];

  @Input() invalid: boolean = false;
  @Input() disabled: boolean = false;
  public readonly isNested: boolean;
  public readonly nestingLevel: number;

  @Input() collapsed?: boolean;
  @Output() collapsedChange = new EventEmitter<boolean>();

  @Input() expanded?: boolean;
  @Output() expandedChange = new EventEmitter<boolean>();

  @Input() title?: string;
  @Input() propagateState = false;

  constructor(@Optional() @SkipSelf() private parent: CollapsibleContainerComponent) {
    this.isNested = parent != null;
    this.nestingLevel = this.parent?.nestingLevel + 1 || 0;
    this.isCollapsedState = this.isNested;
    if (this.isNested) {
      this.parent.childList.push(this);
    }
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    if (this.expanded != null) {
      this.setState(!this.expanded);
    } else if (this.collapsed != null) {
      this.setState(this.collapsed);
    } else {
      this.setState(this.isCollapsedState);
    }

  }

  ngAfterViewInit(): void {
  }

  ngAfterViewChecked(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expanded']) {
      this.setState(!changes['expanded'].currentValue);
    } else if (changes['collapsed']) {
      this.setState(changes['collapsed'].currentValue);
    } else if (changes['invalid']) {
      this.recursiveSetParentStyle(this);
    }
  }

  ngDoCheck(): void {
  }

  switchState() {
    this.setState(!this.isCollapsedState);
  }

  private setState(isCollapsed: boolean) {
    if (!this.disabled) {
      isCollapsed ? this.collapse() : this.expand();
    }
  }

  private expand() {
    this.isCollapsedState = false;
    this.collapsed = this.isCollapsedState;
    this.expanded = !this.isCollapsedState;
    if (this.propagateState) {
      this.childList.forEach(child => child.expand());
    }
    this.collapsedChange.emit(this.collapsed);
    this.expandedChange.emit(this.expanded);
  }

  private collapse() {
    this.isCollapsedState = true;
    this.collapsed = this.isCollapsedState;
    this.expanded = !this.isCollapsedState;
    if (this.propagateState) {
      this.childList.forEach(child => child.collapse());
    }
    this.collapsedChange.emit(this.collapsed);
    this.expandedChange.emit(this.expanded);
  }

  private recursiveSetParentStyle(element: CollapsibleContainerComponent) {
    if (element.isNested) {
      element.parent.invalid = element.invalid;
      this.recursiveSetParentStyle(this.parent);
    }
  }

}

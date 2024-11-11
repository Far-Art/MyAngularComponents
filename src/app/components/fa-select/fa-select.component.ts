import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, Output, QueryList, Renderer2} from '@angular/core';
import {FaOptionComponent} from './fa-option/fa-option.component';
import {Subscription} from 'rxjs';
import {animate, style, transition, trigger} from '@angular/animations';
import {IdGenerator} from '../../utils/IdGenerator';


@Component({
  selector: 'fa-select',
  templateUrl: './fa-select.component.html',
  styleUrls: ['./fa-select.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('120ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('120ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class FaSelectComponent<T = any> implements AfterContentInit, OnDestroy {

  selectedValue: T | null = null;
  dropdownOpen = false;
  listboxId = IdGenerator.generate();

  @Input('disabled') isDisabled = false;
  @Output('selected') selectedEmitter = new EventEmitter<T | null>();
  @ContentChildren(FaOptionComponent) private options!: QueryList<FaOptionComponent<T>>;

  private readonly appRoot: HTMLElement = document.getElementById('app-root')!;
  private subscriptions: Subscription[] = [];
  private escListenFn!: () => void;
  private keysListenFn!: () => void;

  constructor(
      private renderer: Renderer2
  ) {}

  onClick() {
    if (this.dropdownOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  ngAfterContentInit(): void {
    this.reSubscribeAll();
    this.options.changes.subscribe(() => {
      this.reSubscribeAll();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
    this.escListenFn?.();
  }

  openDropdown() {
    this.dropdownOpen = true;
    this.renderer.setAttribute(this.appRoot, 'inert', '');
    this.escListenFn = this.renderer.listen(document.body, 'keydown.Escape', () => this.closeDropdown())
    this.keysListenFn = this.renderer.listen(document.body, 'keydown.Escape', () => this.closeDropdown())
  }

  closeDropdown() {
    this.dropdownOpen = false;
    this.renderer.removeAttribute(this.appRoot, 'inert');
    this.escListenFn?.();
  }

  private reSubscribeAll() {
    this.unsubscribeAll();
    this.options.forEach(opt => {
      this.subscriptions.push(opt.clicked.subscribe(val => {
        this.selectedValue = val;
        this.selectedEmitter.emit(val);
        this.closeDropdown();
      }));
    });
  }

  private unsubscribeAll() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions.length = 0;
  }
}

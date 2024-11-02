import {AfterContentInit, Component, ContentChildren, EventEmitter, HostListener, Input, OnDestroy, Output, QueryList, Renderer2} from '@angular/core';
import {FaOptionComponent} from './fa-option/fa-option.component';
import {Subscription} from 'rxjs';


@Component({
  selector: 'fa-select',
  templateUrl: './fa-select.component.html',
  styleUrls: ['./fa-select.component.scss']
})
export class FaSelectComponent<T = any> implements AfterContentInit, OnDestroy {

  @ContentChildren(FaOptionComponent) private options!: QueryList<FaOptionComponent<T>>;
  private readonly appRoot: HTMLElement = document.getElementById('app-root')!;
  private subscriptions: Subscription[] = [];
  private listenFn!: () => void;

  selectedValue: T | null = null;
  dropdownOpen = false;

  @Input('disabled') isDisabled = false;
  @Output('selected') selectedEmitter = new EventEmitter<T | null>();

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
    this.listenFn?.();
  }

  openDropdown() {
    this.dropdownOpen = true;
    this.renderer.setAttribute(this.appRoot, 'inert', '');
    this.listenFn = this.renderer.listen(document.body, 'keydown.Escape', () => this.closeDropdown())
  }

  closeDropdown() {
    this.dropdownOpen = false;
    this.renderer.removeAttribute(this.appRoot, 'inert');
    this.listenFn?.();
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

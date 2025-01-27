import {AfterContentInit, Component, ContentChildren, EventEmitter, forwardRef, Input, OnDestroy, Output, QueryList, Renderer2} from '@angular/core';
import {FaOptionComponent} from './fa-option/fa-option.component';
import {Subscription} from 'rxjs';
import {animate, style, transition, trigger} from '@angular/animations';
import {IdGenerator} from '../../utils/IdGenerator';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'fa-select',
  templateUrl: './fa-select.component.html',
  styleUrls: ['./fa-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FaSelectComponent),
      multi: true
    }
  ],
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
export class FaSelectComponent<T = any> implements AfterContentInit, OnDestroy, ControlValueAccessor {

  selectedValue: T | null = null;
  displayedContent: string | null = null;
  dropdownOpen = false;
  listboxId = IdGenerator.generate();

  @Input('disabled') isDisabled = false;
  @Output('value') selectedValueEmitter = new EventEmitter<T | null>();

  @ContentChildren(FaOptionComponent) private options!: QueryList<FaOptionComponent<T>>;

  private readonly appRoot: HTMLElement = document.getElementById('app-root')!;
  private subscriptions: Subscription[] = [];
  private escListenFn!: () => void;
  private keysListenFn!: () => void;

  constructor(
      private renderer: Renderer2
  ) {}

  onChange = (value: any) => {};
  onTouched = () => {};

  toggleDropdown() {
    if (!this.isDisabled) {
      if (this.dropdownOpen) {
        this.closeDropdown();
      } else {
        this.openDropdown();
      }
    }
  }

  ngAfterContentInit(): void {
    this.reSubscribeAll();
    this.selectValueOnInit();
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
    this.options.forEach(opt => opt._isHighlighted = false);
    this.escListenFn?.();
  }

  writeValue(value: T | null): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  private reSubscribeAll() {
    this.unsubscribeAll();
    this.options.forEach(opt => {
      this.subscribeForClicks(opt);
      this.subscribeForContent(opt);
      this.subscribeForHover(opt);
    });
  }

  private subscribeForClicks(option: FaOptionComponent<T>): void {
    this.subscriptions.push(option.clickEmitter.subscribe(() => this.onOptionClick(option)));
  }

  private subscribeForContent(option: FaOptionComponent<T>): void {
    this.subscriptions.push(option.htmlContentEmitter.subscribe(text => this.displayedContent = text));
  }

  private subscribeForHover(option: FaOptionComponent<T>): void {
    this.subscriptions.push(option.hoverEmitter.subscribe(() => this.options.forEach(opt => opt._isHighlighted = opt === option)));
  }

  private onOptionClick(option: FaOptionComponent<T>): void {
    this.selectedValue = option.value;
    this.selectedValueEmitter.emit(this.selectedValue);
    this.options.forEach(opt => opt._isSelected = false);
    option._isSelected = true;
    this.closeDropdown();
  }

  private unsubscribeAll() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions.length = 0;
  }

  private selectValueOnInit() {
    const option = this.options.find(option => this.isEqual(option)) ?? this.options.first;
    setTimeout(() => option.onClick());
  }

  private isEqual(option: FaOptionComponent<T>): boolean {
    return JSON.stringify(option.value) === JSON.stringify(this.selectedValue);
  }
}

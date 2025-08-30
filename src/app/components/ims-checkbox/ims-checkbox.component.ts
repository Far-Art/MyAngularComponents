import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ElementRef,
  inject,
  signal,
  computed,
  effect,
  HostListener,
  forwardRef,
  input,
  output,
} from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

export type ImsCheckboxChange = { checked: boolean; indeterminate: boolean };

@Component({
  selector: 'ims-checkbox',
  standalone: true,
  templateUrl: './ims-checkbox.component.html',
  styleUrls: ['./ims-checkbox.component.scss'],
  host: {
    '[attr.role]': "'checkbox'",
    '[attr.aria-checked]': 'ariaChecked()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.aria-required]': 'required() ? "true" : null',
    '[class.ims-checked]': 'checked()',
    '[class.ims-indeterminate]': 'indeterminate()',
    '[class.ims-disabled]': 'disabled()',
    '[class.ims-focused]': 'focused()',
  },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ImsCheckboxComponent), multi: true }
  ],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImsCheckboxComponent implements ControlValueAccessor {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly focusMonitor = inject(FocusMonitor);

  // === External readonly inputs ===
  checkedInput = input<boolean, BooleanInput>(false, { transform: coerceBooleanProperty });
  indeterminateInput = input<boolean, BooleanInput>(false, { transform: coerceBooleanProperty });
  disabledInput = input<boolean, BooleanInput>(false, { transform: coerceBooleanProperty });
  required = input<boolean, BooleanInput>(false, { transform: coerceBooleanProperty });
  id = input<string>('');
  name = input<string>('');

  // === Outputs ===
  changed = output<ImsCheckboxChange>();

  // === Internal writable state ===
  private _checked = signal(false);
  private _indeterminate = signal(false);
  private _disabledCva = signal(false); // setDisabledState()
  focused = signal(false);

  // Public getters used by template/host
  checked = () => this._checked();
  indeterminate = () => this._indeterminate();

  // Effective disabled (external OR CVA)
  disabled = computed(() => this.disabledInput() || this._disabledCva());

  ariaChecked = computed(() => (this._indeterminate() ? 'mixed' : this._checked() ? 'true' : 'false'));

  // CVA hooks
  private onChange: (val: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Mirror external inputs -> internal signals
    effect(() => this._checked.set(this.checkedInput()));
    effect(() => this._indeterminate.set(this.indeterminateInput()));

    // Focus ring mgmt + touched
    this.focusMonitor.monitor(this.el.nativeElement, true).subscribe(origin => {
      this.focused.set(!!origin);
      if (!origin) this.onTouched();
    });
  }

  // === User interactions ===
  toggleFromUser(): void {
    if (this.disabled()) return;

    if (this._indeterminate()) {
      // Clear visual tri-state first interaction (Material-like)
      this._indeterminate.set(false);
    } else {
      this._checked.set(!this._checked());
    }

    this.onChange(this._checked());
    this.changed.emit({ checked: this._checked(), indeterminate: this._indeterminate() });
  }

  @HostListener('click', ['$event'])
  onHostClick(ev: MouseEvent): void {
    ev.preventDefault();
    ev.stopPropagation();
    this.toggleFromUser();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(ev: KeyboardEvent): void {
    if (this.disabled()) return;
    if (ev.key === ' ' || ev.key === 'Enter') {
      ev.preventDefault();
      this.toggleFromUser();
    }
  }

  // === ControlValueAccessor ===
  writeValue(value: boolean | null | undefined): void {
    this._checked.set(!!value);
  }
  registerOnChange(fn: (val: boolean) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this._disabledCva.set(!!isDisabled); }

  // Programmatic helper (optional)
  setIndeterminate(v: boolean): void { this._indeterminate.set(!!v); }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.el.nativeElement);
  }
}

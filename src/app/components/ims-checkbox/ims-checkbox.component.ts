import {ChangeDetectionStrategy, Component, computed, effect, ElementRef, forwardRef, HostListener, inject, input, OnDestroy, output, signal, untracked, ViewEncapsulation} from '@angular/core';
import {FocusMonitor} from '@angular/cdk/a11y';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';


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
        '[class.ims-focused]': 'focused()'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImsCheckboxComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImsCheckboxComponent implements ControlValueAccessor, OnDestroy {
    // === External readonly inputs ===
    checkedInput = input<boolean, BooleanInput>(false, {
        transform: coerceBooleanProperty,
        alias: 'checked'
    });
    indeterminateInput = input<boolean, BooleanInput>(false, {
        transform: coerceBooleanProperty,
        alias: 'indeterminate'
    });
    disabledInput = input<boolean, BooleanInput>(false, {
        transform: coerceBooleanProperty,
        alias: 'disabled'
    });
    required = input<boolean, BooleanInput>(false, {transform: coerceBooleanProperty});
    id = input<string>('');
    name = input<string>('');

    // Value mapping
    trueValue = input<unknown>(true);
    falseValue = input<unknown>(false);

    // === Outputs ===
    changed = output<ImsCheckboxChange>();
    focused = signal(false);
    private readonly el = inject(ElementRef<HTMLElement>);
    private readonly focusMonitor = inject(FocusMonitor);
    // === Internal writable state ===
    private _checked = signal(false);
    private _indeterminate = signal(false);
    ariaChecked = computed(() => (this._indeterminate() ? 'mixed' : this._checked() ? 'true' : 'false'));
    private _disabledCva = signal(false); // setDisabledState()
    // Effective disabled (external OR CVA)
    disabled = computed(() => this.disabledInput() || this._disabledCva());

    private _usedInForm = signal(false);
    private _hasFirstWrite = false;

    constructor() {
        // Mirror external inputs -> internal signals
        effect(() => {
            const v = this.indeterminateInput();
            untracked(() => this._indeterminate.set(v));
        }, {allowSignalWrites: true});

        // Mirror [checked] only when NOT used in a form
        effect(() => {
            if (!this._usedInForm()) {
                const v = this.checkedInput();
                untracked(() => this._checked.set(v));
            }
        }, {allowSignalWrites: true});

        // Focus ring mgmt and touched
        this.focusMonitor.monitor(this.el.nativeElement, true).subscribe(origin => {
            this.focused.set(!!origin);
            if (!origin) this.onTouched();
        });
    }

    // Public getters used by template/host
    checked = () => this._checked();

    indeterminate = () => this._indeterminate();

    // === User interactions ===
    toggleFromUser(): void {
        if (this.disabled()) return;

        if (this._indeterminate()) {
            // Clear visual tri-state first interaction (Material-like)
            this._indeterminate.set(false);
        } else {
            this._checked.set(!this._checked());
        }
        const nextVal = this.mapToValue(this._checked());

        this.onChange(nextVal);
        this.changed.emit({
            checked: this._checked(),
            indeterminate: this._indeterminate()
        });
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
        this._usedInForm.set(true);

        const t = this.trueValue();
        const f = this.falseValue();

        // UI state: checked if equals trueValue
        const isTrue = Object.is(value, t);
        this._checked.set(isTrue);

        // If this is the first init, do not emit any change back.
        if (!this._hasFirstWrite) {
            this._hasFirstWrite = true;
            return;
        }

        // After first init: coerce unknowns to falseValue and push back
        if (!isTrue && !Object.is(value, f)) {
            // defer to avoid change-cycle warnings
            queueMicrotask(() => this.onChange(f));
        }
    }

    registerOnChange(fn: (val: boolean) => void): void {
        this._usedInForm.set(true);
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this._usedInForm.set(true);
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this._disabledCva.set(isDisabled);
    }

    // Programmatic helper (optional)
    setIndeterminate(v: boolean): void {
        this._indeterminate.set(v);
    }

    ngOnDestroy(): void {
        this.focusMonitor.stopMonitoring(this.el.nativeElement);
    }

    // ---- Helpers for mapping ----
    private mapToValue(checked: boolean): any {
        return checked ? this.trueValue() : this.falseValue();
    }

    // CVA hooks
    private onChange: (val: any) => void = () => {};

    private onTouched: () => void = () => {};
}

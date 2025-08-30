import {Directive, ElementRef, EnvironmentInjector, EventEmitter, HostBinding, HostListener, inject, Injector, Input, Output, TemplateRef, Type, ViewContainerRef} from '@angular/core';
import {ConnectedPosition, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, TemplatePortal} from '@angular/cdk/portal';
import {POPOVER_DATA} from './popover-data.token';


@Directive({
    selector: '[imsPopover]',
    standalone: true
    // imports: [OverlayModule, PortalModule, A11yModule]
})
export class PopoverDirective {

    /** Provide either a TemplateRef or a Component type */
    @Input('imsPopover') popover?: TemplateRef<any> | Type<any>;

    @Input() popoverData?: unknown;
    @Input() popoverPositions?: ConnectedPosition[];
    @Input() popoverOffset = 8;
    @Input() openDelay = 80;
    @Input() closeDelay = 120;

    @Output() popoverOpened = new EventEmitter<void>();
    @Output() popoverClosed = new EventEmitter<void>();

    @HostBinding('attr.aria-haspopup') ariaHaspopup = 'dialog';
    private overlayRef?: OverlayRef;
    private triggerHovered = false;
    private triggerFocused = false;
    private overlayHovered = false;
    private overlayFocused = false;
    private openTimer?: number;
    private closeTimer?: number;
    private readonly overlay = inject(Overlay);
    private readonly el = inject(ElementRef<HTMLElement>);
    private readonly vcr = inject(ViewContainerRef);
    private readonly injector = inject(Injector);
    private readonly envInjector = inject(EnvironmentInjector);

    @HostBinding('attr.aria-expanded') get ariaExpanded() { return !!this.overlayRef?.hasAttached(); }

    @HostListener('mouseenter') onMouseEnter() {
        this.triggerHovered = true;
        this.scheduleOpen();
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.triggerHovered = false;
        this.maybeScheduleClose();
    }

    @HostListener('focusin') onFocusIn() {
        this.triggerFocused = true;
        this.scheduleOpen();
    }

    @HostListener('focusout') onFocusOut() {
        this.triggerFocused = false;
        this.maybeScheduleClose();
    }

    @HostListener('document:keydown', ['$event'])
    onDocKeydown(ev: KeyboardEvent) {
        if (ev.key === 'Escape' && this.overlayRef?.hasAttached()) this.forceClose();
    }

    ngOnDestroy() {
        this.detachOverlayListeners();
        this.overlayRef?.dispose();
        this.clearAllTimers();
    }

    private onOverlayMouseEnter = () => {
        this.overlayHovered = true;
        this.clearCloseTimer();
    };

    private onOverlayMouseLeave = () => {
        this.overlayHovered = false;
        this.maybeScheduleClose();
    };

    private onOverlayFocusIn = () => {
        this.overlayFocused = true;
        this.clearCloseTimer();
    };

    private onOverlayFocusOut = () => {
        this.overlayFocused = false;
        this.maybeScheduleClose();
    };

    private scheduleOpen() {
        if (this.overlayRef?.hasAttached()) return;
        this.clearCloseTimer();
        this.clearOpenTimer();
        this.openTimer = window.setTimeout(() => this.open(), this.openDelay);
    }

    private maybeScheduleClose() {
        if (this.anySideActive()) return;
        this.clearCloseTimer();
        this.closeTimer = window.setTimeout(() => {
            if (!this.anySideActive()) this.close();
        }, this.closeDelay);
    }

    private anySideActive() {
        return this.triggerHovered || this.triggerFocused || this.overlayHovered || this.overlayFocused;
    }

    private clearOpenTimer() {
        if (this.openTimer) {
            clearTimeout(this.openTimer);
            this.openTimer = undefined;
        }
    }

    private clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = undefined;
        }
    }

    private clearAllTimers() {
        this.clearOpenTimer();
        this.clearCloseTimer();
    }

    private ensureOverlay() {
        if (this.overlayRef) return;

        const positions: ConnectedPosition[] = this.popoverPositions ?? [
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: this.popoverOffset
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
                offsetY: -this.popoverOffset
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top',
                offsetY: this.popoverOffset
            },
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom',
                offsetY: -this.popoverOffset
            }
        ];

        const positionStrategy = this.overlay.position()
                                     .flexibleConnectedTo(this.el)
                                     .withPositions(positions)
                                     .withFlexibleDimensions(false)
                                     .withPush(true);

        const cfg: OverlayConfig = {
            positionStrategy,
            hasBackdrop: false,
            scrollStrategy: this.overlay.scrollStrategies.reposition()
        };

        this.overlayRef = this.overlay.create(cfg);
        this.overlayRef.detachments().subscribe(() => {
            this.detachOverlayListeners();
            this.popoverClosed.emit();
        });
    }

    private attachOverlayListeners() {
        const el = this.overlayRef!.overlayElement;
        el.addEventListener('mouseenter', this.onOverlayMouseEnter);
        el.addEventListener('mouseleave', this.onOverlayMouseLeave);
        el.addEventListener('focusin', this.onOverlayFocusIn);
        el.addEventListener('focusout', this.onOverlayFocusOut);
    }

    private detachOverlayListeners() {
        if (!this.overlayRef) return;
        const el = this.overlayRef.overlayElement;
        el.removeEventListener('mouseenter', this.onOverlayMouseEnter);
        el.removeEventListener('mouseleave', this.onOverlayMouseLeave);
        el.removeEventListener('focusin', this.onOverlayFocusIn);
        el.removeEventListener('focusout', this.onOverlayFocusOut);
    }

    private open() {
        if (!this.popover) return;
        this.ensureOverlay();

        if (this.popover instanceof TemplateRef) {
            const portal = new TemplatePortal(this.popover, this.vcr, {$implicit: this.popoverData});
            this.overlayRef!.attach(portal);
        } else {
            const injector = Injector.create({
                parent: this.injector,
                providers: [
                    {
                        provide: POPOVER_DATA,
                        useValue: this.popoverData
                    }
                ]
            });
            const portal = new ComponentPortal(this.popover);
            this.overlayRef!.attach(portal);
        }

        this.attachOverlayListeners();
        this.popoverOpened.emit();

        queueMicrotask(() => {
            if (!this.triggerHovered && this.triggerFocused) {
                const firstFocusable = this.overlayRef!.overlayElement.querySelector<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                firstFocusable?.focus();
            }
        });
    }

    private close() {
        this.clearAllTimers();
        this.overlayRef?.detach();
    }

    private forceClose() {
        this.triggerHovered = this.triggerFocused = this.overlayHovered = this.overlayFocused = false;
        this.close();
    }
}
import {Directive, ElementRef, EventEmitter, HostBinding, HostListener, inject, Input, Output, TemplateRef, ViewContainerRef} from '@angular/core';
import {ConnectedPosition, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';


@Directive({
    selector: '[imsPopover]',
    standalone: true
    // imports: [OverlayModule, PortalModule, A11yModule]
})
export class PopoverDirective {

    /** Provide either a TemplateRef or a Component type */
    @Input('imsPopover') popover?: TemplateRef<any>;

    /** Placement fallbacks */
    @Input() popoverPositions?: ConnectedPosition[];

    /** Pixel offset from trigger */
    @Input() popoverOffset = 8;

    /** Debounce/delay (ms) */
    @Input() openDelay = 10;
    @Input() closeDelay = 60;

    /** Events */
    @Output() popoverOpened = new EventEmitter<void>();
    @Output() popoverClosed = new EventEmitter<void>();

    // ARIA on trigger
    @HostBinding('attr.aria-haspopup') ariaHaspopup = 'dialog';
    @HostBinding('attr.aria-expanded') get ariaExpanded() { return !!this.overlayRef?.hasAttached(); }

    private overlayRef?: OverlayRef;

    // state flags
    private triggerHovered = false;
    private triggerFocused = false;
    private overlayHovered = false;
    private overlayFocused = false;

    // timers
    private openTimer?: number;
    private closeTimer?: number;

    // overlay listeners
    private onOverlayMouseEnter = () => { this.overlayHovered = true; this.clearCloseTimer(); };
    private onOverlayMouseLeave = () => { this.overlayHovered = false; this.maybeScheduleClose(); };
    private onOverlayFocusIn    = () => { this.overlayFocused = true; this.clearCloseTimer(); };
    private onOverlayFocusOut   = () => { this.overlayFocused = false; this.maybeScheduleClose(); };

    // DI
    private readonly overlay = inject(Overlay);
    private readonly el = inject(ElementRef<HTMLElement>);
    private readonly vcr = inject(ViewContainerRef);

    // ===== Trigger events =====
    @HostListener('mouseenter') onMouseEnter() { this.triggerHovered = true; this.scheduleOpen(); }
    @HostListener('mouseleave') onMouseLeave() { this.triggerHovered = false; this.maybeScheduleClose(); }
    @HostListener('focusin') onFocusIn()       { this.triggerFocused = true; this.scheduleOpen(); }
    @HostListener('focusout') onFocusOut()     { this.triggerFocused = false; this.maybeScheduleClose(); }

    // ESC to close
    @HostListener('document:keydown', ['$event'])
    onDocKeydown(ev: KeyboardEvent) {
        if (ev.key === 'Escape' && this.overlayRef?.hasAttached()) this.forceClose();
    }

    ngOnDestroy() {
        this.detachOverlayListeners();
        this.overlayRef?.dispose();
        this.clearAllTimers();
    }

    // ===== Open/Close orchestration =====
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

    private clearOpenTimer()  { if (this.openTimer)  { clearTimeout(this.openTimer);  this.openTimer = undefined; } }
    private clearCloseTimer() { if (this.closeTimer) { clearTimeout(this.closeTimer); this.closeTimer = undefined; } }
    private clearAllTimers()  { this.clearOpenTimer(); this.clearCloseTimer(); }

    // ===== Overlay lifecycle =====
    private ensureOverlay() {
        if (this.overlayRef) return;

        const positions: ConnectedPosition[] = this.popoverPositions ?? [
            { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: this.popoverOffset },
            { originX: 'start', originY: 'top',    overlayX: 'start', overlayY: 'bottom', offsetY: -this.popoverOffset },
            { originX: 'end',   originY: 'bottom', overlayX: 'end',   overlayY: 'top', offsetY: this.popoverOffset },
            { originX: 'end',   originY: 'top',    overlayX: 'end',   overlayY: 'bottom', offsetY: -this.popoverOffset },
        ];

        const positionStrategy = this.overlay.position()
                                     .flexibleConnectedTo(this.el)
                                     .withPositions(positions)
                                     .withFlexibleDimensions(false)
                                     .withPush(true);

        const cfg: OverlayConfig = {
            positionStrategy,
            hasBackdrop: false, // interactive hover/focus popover
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

        const portal = new TemplatePortal(this.popover, this.vcr);
        this.overlayRef!.attach(portal);

        this.attachOverlayListeners();
        this.popoverOpened.emit();

        // If opened via keyboard, try focus the first focusable inside.
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
import {ComponentRef, Directive, ElementRef, HostBinding, HostListener, inject, input, Input, OnDestroy, output, Renderer2, TemplateRef} from '@angular/core';
import {ConnectedPosition, FlexibleConnectedPositionStrategy, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ArrowAlign, PopoverContainerComponent} from './popover-container/popover-container.component';


@Directive({
    selector: '[ims-popover]',
    standalone: true
})
export class PopoverDirective implements OnDestroy {

    /** Provide a TemplateRef */
    popover = input.required<TemplateRef<any>>({alias: 'ims-popover'});

    /** Pixel offset from trigger */
    @Input() popoverOffset = 8;

    /** Debounce/delay (ms) */
    @Input() openDelay = 0;
    @Input() closeDelay = 80;

    @Input() ariaLabel?: string;
    @Input() role: 'dialog' | 'tooltip' = 'dialog';
    /** Events */
    popoverOpened = output<void>();
    popoverClosed = output<void>();
    // ARIA on trigger
    @HostBinding('attr.aria-haspopup') ariaHaspopup = 'dialog';
    private animationDurationMs = 160;
    private overlayRef?: OverlayRef;
    // state flags
    private triggerHovered = false;
    private triggerFocused = false;
    private overlayHovered = false;
    private overlayFocused = false;
    // timers
    private openTimer?: number;
    private closeTimer?: number;
    // DI
    private readonly overlay = inject(Overlay);
    private readonly el = inject(ElementRef<HTMLElement>);
    private readonly renderer = inject(Renderer2);

    private mouseEnterListener?: () => void;
    private mouseLeaveListener?: () => void;
    private focusEnterListener?: () => void;
    private focusLeaveListener?: () => void;

    private positionStrategy?: FlexibleConnectedPositionStrategy;
    private containerRef?: ComponentRef<PopoverContainerComponent>;

    @HostBinding('attr.aria-expanded')
    get ariaExpanded() { return !!this.overlayRef?.hasAttached(); }

    // ===== Trigger events =====
    @HostListener('mouseenter')
    onMouseEnter() {
        this.triggerHovered = true;
        this.scheduleOpen();
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.triggerHovered = false;
        this.maybeScheduleClose();
    }

    @HostListener('focusin')
    onFocusIn() {
        this.triggerFocused = true;
        this.scheduleOpen();
    }

    @HostListener('focusout')
    onFocusOut() {
        this.triggerFocused = false;
        this.maybeScheduleClose();
    }

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

    // overlay listeners
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

    // ===== Overlay lifecycle =====
    private ensureOverlay() {
        if (this.overlayRef) return;

        const positions: ConnectedPosition[] = [
            // Preferred: ABOVE, centered
            {
                originX: 'center',
                originY: 'top',
                overlayX: 'center',
                overlayY: 'bottom',
                offsetY: -this.popoverOffset
            },
            // Fallback: BELOW, centered
            {
                originX: 'center',
                originY: 'bottom',
                overlayX: 'center',
                overlayY: 'top',
                offsetY: this.popoverOffset
            },
            // Fallbacks: above-left / above-right
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
                offsetY: -this.popoverOffset
            },
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom',
                offsetY: -this.popoverOffset
            },
            // Fallbacks: below-left / below-right
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: this.popoverOffset
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top',
                offsetY: this.popoverOffset
            }
        ];

        this.positionStrategy = this.overlay.position()
                                    .flexibleConnectedTo(this.el)
                                    .withPositions(positions)
                                    .withFlexibleDimensions(false)
                                    .withPush(true);

        this.positionStrategy.positionChanges.subscribe((change) => {
            const isAbove = change.connectionPair.overlayY === 'bottom';
            if (this.containerRef) {
                this.containerRef.instance.above = isAbove;
                let align: ArrowAlign;
                if (change.connectionPair.overlayX === 'start') {
                    align = 'start';
                } else if (change.connectionPair.overlayX === 'end') {
                    align = 'end';
                } else {
                    align = 'center'; // default
                }
                this.containerRef.instance.arrowAlign = align;

                this.containerRef.changeDetectorRef.markForCheck();
            }
        });

        const cfg: OverlayConfig = {
            positionStrategy: this.positionStrategy,
            hasBackdrop: false,
            scrollStrategy: this.overlay.scrollStrategies.reposition()
        };

        this.overlayRef = this.overlay.create(cfg);
        this.overlayRef.detachments().subscribe(() => {
            this.containerRef = undefined;
            this.detachOverlayListeners();
            this.popoverClosed.emit();
        });
    }

    private attachOverlayListeners() {
        const el = this.overlayRef!.overlayElement;
        this.mouseEnterListener = this.renderer.listen(el, 'mouseenter', this.onOverlayMouseEnter);
        this.mouseLeaveListener = this.renderer.listen(el, 'mouseleave', this.onOverlayMouseLeave);
        this.focusEnterListener = this.renderer.listen(el, 'focusin', this.onOverlayFocusIn);
        this.focusLeaveListener = this.renderer.listen(el, 'focusout', this.onOverlayFocusOut);
    }

    private detachOverlayListeners() {
        if (!this.overlayRef) return;
        this.mouseEnterListener?.();
        this.mouseLeaveListener?.();
        this.focusEnterListener?.();
        this.focusLeaveListener?.();
    }

    private open() {
        const tpl = this.popover();
        if (!tpl) return;

        this.ensureOverlay();

        const portal = new ComponentPortal(PopoverContainerComponent);
        this.containerRef = this.overlayRef!.attach(portal);
        this.containerRef.instance.template = tpl;
        this.containerRef.instance.ariaLabel = this.ariaLabel;
        this.containerRef.instance.role = this.role;

        // Initial flip + align (before first positionChanges tick to avoid flicker)
        const current = this.positionStrategy!.positions[0];
        this.containerRef.instance.above = current.overlayY === 'bottom';

        let align: ArrowAlign;
        if (current.overlayX === 'start') {
            align = 'start';
        } else if (current.overlayX === 'end') {
            align = 'end';
        } else {
            align = 'center';
        }
        this.containerRef.instance.arrowAlign = align;

        this.containerRef.changeDetectorRef.detectChanges();

        // ENTER: toggle .is-open on the next frame to trigger transition
        requestAnimationFrame(() => {
            if (this.containerRef) {
                this.containerRef.instance.open = true;
                this.containerRef.changeDetectorRef.markForCheck();
            }
        });

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
        // If we have a container, run exit animation, then detach
        const pane = this.overlayRef?.overlayElement.querySelector('.ims-popover') as HTMLElement | null;
        if (this.containerRef && pane) {
            // trigger exit
            this.containerRef.instance.leaving = true;
            this.containerRef.instance.open = false;
            this.containerRef.changeDetectorRef.markForCheck();

            let done = false;
            const cleanup = () => {
                if (done) return;
                done = true;
                unlisten?.();
                clearTimeout(fallbackTimer);
                this.overlayRef?.detach();
            };

            const unlisten = this.renderer.listen(pane, 'transitionend', (ev: TransitionEvent) => {
                if (ev.target === pane) cleanup();
            });

            const fallbackTimer = window.setTimeout(cleanup, this.animationDurationMs + 50);
        } else {
            this.overlayRef?.detach();
        }
    }

    private forceClose() {
        this.triggerHovered = this.triggerFocused = this.overlayHovered = this.overlayFocused = false;
        this.close();
    }

}
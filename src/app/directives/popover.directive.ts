import {Directive, ElementRef, EnvironmentInjector, EventEmitter, HostBinding, HostListener, inject, Injector, Input, Output, TemplateRef, Type, ViewContainerRef} from '@angular/core';
import {ConnectedPosition, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, TemplatePortal} from '@angular/cdk/portal';
import {POPOVER_DATA} from './popover-data.token';
import {Subscription} from 'rxjs';


@Directive({
    selector: '[faPopover]',
    standalone: true
    // imports: [OverlayModule, PortalModule, A11yModule]
})
export class PopoverDirective {

    /** Supply either a TemplateRef or a Component type */
    @Input('faPopover') popover?: TemplateRef<any> | Type<any>;

    /** Data passed to the template (as $implicit) or component (via POPOVER_DATA token) */
    @Input() popoverData?: unknown;

    /** Optional custom positions */
    @Input() popoverPositions?: ConnectedPosition[];

    /** Pixel offset from the trigger */
    @Input() popoverOffset = 8;

    /** Close when clicking the trigger again (toggle behavior) */
    @Input() popoverToggle = true;

    /** Emitted on open/close */
    @Output() popoverOpened = new EventEmitter<void>();
    @Output() popoverClosed = new EventEmitter<void>();
    // ARIA on the trigger
    @HostBinding('attr.aria-haspopup') ariaHaspopup = 'dialog';
    private overlayRef?: OverlayRef;
    private subs = new Subscription();
    private readonly overlay = inject(Overlay);
    private readonly el = inject(ElementRef<HTMLElement>);
    private readonly vcr = inject(ViewContainerRef);
    private readonly injector = inject(Injector);
    private readonly envInjector = inject(EnvironmentInjector);

    @HostBinding('attr.aria-expanded') get ariaExpanded() { return !!this.overlayRef && this.overlayRef.hasAttached(); }

    @HostListener('mouseover', ['$event'])
    @HostListener('focusin', ['$event'])
    onHostClick(e: Event) {
        e.stopPropagation();
        if (this.overlayRef?.hasAttached()) {
            if (this.popoverToggle) this.close();
            return;
        }
        this.open();
    }

    @HostListener('document:keydown', ['$event'])
    onDocKeydown(ev: KeyboardEvent) {
        if (ev.key === 'Escape' && this.overlayRef?.hasAttached()) {
            this.close();
        }
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
        this.overlayRef?.dispose();
    }

    open() {
        if (!this.popover) return;

        // Create overlay if needed
        if (!this.overlayRef) {
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
                hasBackdrop: true,
                backdropClass: 'cdk-overlay-transparent-backdrop',
                scrollStrategy: this.overlay.scrollStrategies.reposition()
            };

            this.overlayRef = this.overlay.create(cfg);

            // Close on backdrop click / detach
            this.subs.add(this.overlayRef.backdropClick().subscribe(() => this.close()));
            this.subs.add(this.overlayRef.detachments().subscribe(() => this.popoverClosed.emit()));

            // Optional: close on outside pointer events (extra safety)
            this.subs.add(this.overlayRef.outsidePointerEvents().subscribe(() => this.close()));
        }

        // Attach the portal
        if (this.popover instanceof TemplateRef) {
            const portal = new TemplatePortal(this.popover, this.vcr, {$implicit: this.popoverData});
            this.overlayRef.attach(portal);
        } else {
            // Component portal with DI data
            const injector = Injector.create({
                parent: this.injector,
                providers: [
                    {
                        provide: POPOVER_DATA,
                        useValue: this.popoverData
                    }
                ]
            });
            const portal = new ComponentPortal(this.popover, null, injector, this.envInjector as any);
            this.overlayRef.attach(portal);
        }

        this.popoverOpened.emit();

        // Try to move focus into the overlay (if the content has focusable elements)
        queueMicrotask(() => {
            const firstFocusable = this.overlayRef!.overlayElement.querySelector<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            firstFocusable?.focus();
        });
    }

    close() {
        this.overlayRef?.detach();
    }
}

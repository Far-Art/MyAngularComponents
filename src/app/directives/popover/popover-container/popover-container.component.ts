import {Component, Input, TemplateRef} from '@angular/core';
import {NgIf, NgTemplateOutlet} from '@angular/common';


export type ArrowAlign = 'start' | 'center' | 'end';

@Component({
    selector: 'ims-popover-container',
    standalone: true,
    imports: [
        NgIf,
        NgTemplateOutlet
    ],
    templateUrl: './popover-container.component.html',
    styleUrl: './popover-container.component.scss'
})
export class PopoverContainerComponent {
    @Input({required: true}) template!: TemplateRef<unknown>;
    @Input() context?: unknown;

    @Input() ariaLabel?: string;
    @Input() role: 'dialog' | 'tooltip' = 'dialog';

    // flipped state and alignment (set by the directive)
    @Input() above = false;
    arrowAlign: ArrowAlign = 'center';

    @Input() open = false;     // true after attach → triggers enter transition
    @Input() leaving = false;  // true before close → triggers exit transition
}

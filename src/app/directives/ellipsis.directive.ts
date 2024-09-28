import {AfterViewInit, Directive, ElementRef, HostListener, OnDestroy, Renderer2} from '@angular/core';


@Directive({
  selector: '[ellipsis]'
})
export class EllipsisDirective implements AfterViewInit, OnDestroy {
  private originalHtml: string = '';
  private popover: HTMLElement | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.applyTextShrink();
    this.resizeObserver = new ResizeObserver(() => {
      this.applyTextShrink();
    });

    this.resizeObserver.observe(this.el.nativeElement);
    this.originalHtml = this.el.nativeElement.innerHTML;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    const element = this.el.nativeElement;
    if (element.scrollWidth > element.clientWidth) {
      this.createPopover();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.removePopover();
  }

  private applyTextShrink() {
    const element = this.el.nativeElement;
    const maxWidth = element.clientWidth;
    let stretchPercent = 100;

    this.resetStyles();

    while (stretchPercent >= 50) {
      this.renderer.setStyle(element, 'font-stretch', `${stretchPercent}%`);
      if (element.scrollWidth <= maxWidth) {
        return;
      }
      stretchPercent -= 5;
    }

    this.renderer.setStyle(element, 'overflow', 'hidden');
  }

  private resetStyles() {
    this.renderer.setStyle(this.el.nativeElement, 'font-stretch', '100%');
    this.renderer.setStyle(this.el.nativeElement, 'text-overflow', 'ellipsis');
    this.renderer.setStyle(this.el.nativeElement, 'white-space', 'nowrap');
  }

  private createPopover() {
    if (this.popover) return; // Prevent multiple popovers

    this.popover = this.renderer.createElement('div');
    this.renderer.setStyle(this.popover, 'position', 'absolute');
    this.renderer.setStyle(this.popover, 'background', '#fff');
    this.renderer.setStyle(this.popover, 'border', '1px solid #ccc');
    this.renderer.setStyle(this.popover, 'padding', '5px');
    this.renderer.setStyle(this.popover, 'box-shadow', '0 2px 8px rgba(0,0,0,0.15)');
    this.renderer.setStyle(this.popover, 'z-index', '10');
    this.renderer.setStyle(this.popover, 'max-width', '300px');
    this.renderer.setStyle(this.popover, 'overflow-wrap', 'break-word');

    const rect = this.el.nativeElement.getBoundingClientRect();
    this.renderer.setStyle(this.popover, 'top', `${rect.top + window.scrollY + rect.height + 5}px`);
    this.renderer.setStyle(this.popover, 'left', `${rect.left + window.scrollX}px`);

    this.popover!.innerHTML = this.originalHtml;
    this.renderer.appendChild(document.body, this.popover);
  }

  private removePopover() {
    if (this.popover) {
      this.renderer.removeChild(document.body, this.popover);
      this.popover = null;
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
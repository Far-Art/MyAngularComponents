import {Component, ElementRef, Renderer2} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';


@Component({
  selector: 'fa-select',
  templateUrl: './fa-select.component.html',
  styleUrls: ['./fa-select.component.scss']
})
export class FaSelectComponent {
  options = ['Option 1', 'Option 2', 'Option 3'];
  selectedOption: string | null = null;
  dropdownOpen = false;

  private overlayRef!: OverlayRef;
  private readonly appRoot: HTMLElement = document.getElementById('app-root')!;

  constructor(
      private overlay: Overlay,
      private renderer: Renderer2,
      private el: ElementRef
  ) {}

  onClick() {
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen) {
      this.renderer.setAttribute(this.appRoot, 'inert', '');
    } else {
      this.renderer.removeAttribute(this.appRoot, 'inert');
    }

  }

  // toggleDropdown() {
  //   if (this.dropdownOpen) {
  //     this.closeDropdown();
  //   } else {
  //     this.openDropdown();
  //   }
  // }
  //
  // openDropdown() {
  //   this.dropdownOpen = true;
  //
  //   // Position strategy to align the dropdown below the select box
  //   const positionStrategy = this.overlay.position()
  //                                .flexibleConnectedTo(this.el.nativeElement);
  //
  //   this.overlayRef = this.overlay.create({
  //     hasBackdrop: true,
  //     backdropClass: 'select-backdrop',
  //     positionStrategy: positionStrategy,
  //   });
  //
  //   // Attach dropdown component to overlay
  //   const dropdownPortal = new ComponentPortal(FaOptionComponent);
  //   const dropdownRef = this.overlayRef.attach(dropdownPortal);
  //   dropdownRef.instance.options = this.options;
  //   dropdownRef.instance.selectedOption = this.selectedOption;
  //
  //   // Set inert on the body
  //   this.renderer.setAttribute(this.appRoot, 'inert', '');
  //
  //   // Close dropdown on backdrop click
  //   this.overlayRef.backdropClick().subscribe(() => this.closeDropdown());
  // }
  //
  // closeDropdown() {
  //   this.dropdownOpen = false;
  //   this.overlayRef?.detach();
  //   this.renderer.removeAttribute(this.appRoot, 'inert');
  // }
}

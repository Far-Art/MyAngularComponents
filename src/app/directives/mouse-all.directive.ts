import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[mouseall]'
})
export class MouseAllDirective {

  constructor(private elem: ElementRef) {
    console.log(elem);
  }

}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EllipsisDirective} from './directives/ellipsis.directive';
import {AutocompleteComponent} from './components/autocomplete/autocomplete.component';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    EllipsisDirective,
    AutocompleteComponent
  ],
  exports: [
    EllipsisDirective,
    AutocompleteComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll
  ]
})
export class AppModule {}

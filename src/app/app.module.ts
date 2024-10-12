import {NgModule} from '@angular/core';
import {EllipsisDirective} from './directives/ellipsis.directive';
import {AutocompleteComponent} from './components/autocomplete/autocomplete.component';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, ScrollingModule} from '@angular/cdk/scrolling';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    EllipsisDirective,
    AutocompleteComponent
  ],
  exports: [
    EllipsisDirective,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ScrollingModule,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

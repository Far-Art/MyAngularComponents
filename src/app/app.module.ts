import {NgModule} from '@angular/core';
import {EllipsisDirective} from './directives/ellipsis.directive';
import {AutocompleteComponent} from './components/autocomplete/autocomplete.component';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, ScrollingModule} from '@angular/cdk/scrolling';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioComponent } from './components/radio/radio-button/radio.component';
import { RadioGroupComponent } from './components/radio/radio-group/radio-group.component';


@NgModule({
  declarations: [
    AppComponent,
    EllipsisDirective,
    AutocompleteComponent,
    CheckboxComponent,
    RadioComponent,
    RadioGroupComponent
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

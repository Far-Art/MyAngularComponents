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
import {DatePickerComponent} from './components/date-picker/date-picker.component';
import { FaSelectComponent } from './components/fa-select/fa-select.component';
import { FaOptionComponent } from './components/fa-select/fa-option/fa-option.component';
import {CdkConnectedOverlay, CdkOverlayOrigin, OverlayModule} from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    AppComponent,
    EllipsisDirective,
    AutocompleteComponent,
    CheckboxComponent,
    RadioComponent,
    RadioGroupComponent,
    DatePickerComponent,
    FaSelectComponent,
    FaOptionComponent
  ],
  exports: [
    EllipsisDirective,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ScrollingModule,
    OverlayModule,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
    CdkConnectedOverlay,
    CdkOverlayOrigin
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import {NgModule} from '@angular/core';
import {EllipsisDirective} from './directives/ellipsis.directive';
import {AutocompleteComponent} from './components/autocomplete/autocomplete.component';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, ScrollingModule} from '@angular/cdk/scrolling';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CheckboxComponent} from './components/checkbox/checkbox.component';
import {RadioComponent} from './components/radio/radio-button/radio.component';
import {RadioGroupComponent} from './components/radio/radio-group/radio-group.component';
import {DatePickerComponent} from './components/date-picker/date-picker.component';
import {FaSelectComponent} from './components/fa-select/fa-select.component';
import {FaOptionComponent} from './components/fa-select/fa-option/fa-option.component';
import {CdkConnectedOverlay, CdkOverlayOrigin, OverlayModule} from '@angular/cdk/overlay';
import {A11yModule} from '@angular/cdk/a11y';
import {ReactiveFormsModule} from '@angular/forms';
import { CollapsibleTableComponent } from './components/collapsible-table/collapsible-table.component';
import { CollapsibleTableRowComponent } from './components/collapsible-table/collapsible-table-row/collapsible-table-row.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ImsInputComponent } from './components/ims-input/ims-input.component';
import { NumberFormatterDirective } from './directives/number-formatter.directive';


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
    FaOptionComponent,
    CollapsibleTableComponent,
    CollapsibleTableRowComponent,
    ImsInputComponent,
    NumberFormatterDirective
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
    CdkOverlayOrigin,
    A11yModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

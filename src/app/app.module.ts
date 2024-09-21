import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DynamicCategoriesViewComponent} from './components/dynamic-categories-view/dynamic-categories-view.component';
import {AppRoutingModule} from './routing/app-routing.module';
import {AppCategoriesService} from './services/app-categories.service';
import {CategoryViewComponent} from './components/category-view/category-view.component';
import {DraggableTableComponent} from './components/draggable-table/draggable-table.component';
import {MouseAllDirective} from './directives/mouse-all.directive';
import {CollapsibleContainerComponent} from "./components/collapsible-container/collapsible-container.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { DatePlaceholderPipe } from './components/date-picker/date-placeholder.pipe';
import { SelectComponent } from './components/ims-select/select/select.component';
import { OptionComponent } from './components/ims-select/select/option/option.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    AddProductComponent,
    ProductCardComponent,
    DynamicCategoriesViewComponent,
    CategoryViewComponent,
    DraggableTableComponent,
    MouseAllDirective,
    CollapsibleContainerComponent,
    DatePickerComponent,
    DatePlaceholderPipe,
    SelectComponent,
    OptionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [AppCategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

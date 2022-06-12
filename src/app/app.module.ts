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
import { CategoryViewComponent } from './components/category-view/category-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    AddProductComponent,
    ProductCardComponent,
    DynamicCategoriesViewComponent,
    CategoryViewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [AppCategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

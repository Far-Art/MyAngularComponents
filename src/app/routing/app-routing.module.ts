import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminPanelComponent} from "../components/admin-panel/admin-panel.component";
import {CategoryViewComponent} from "../components/category-view/category-view.component";

const routes: Routes = [
  {path: 'admin', component: AdminPanelComponent},
  {path: 'category', component: CategoryViewComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}

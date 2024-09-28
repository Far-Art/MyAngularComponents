import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EllipsisDirective} from './directives/ellipsis.directive';


@NgModule({
  declarations: [
    EllipsisDirective
  ],
  exports: [
    EllipsisDirective
  ],
  imports: [
    CommonModule
  ]
})
export class AppModule {}

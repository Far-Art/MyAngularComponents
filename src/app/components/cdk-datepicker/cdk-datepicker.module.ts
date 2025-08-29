import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkDatepickerComponent} from './cdk-datepicker.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MAT_LUXON_DATE_ADAPTER_OPTIONS, MatLuxonDateModule} from '@angular/material-luxon-adapter';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    CdkDatepickerComponent
  ],
  exports: [CdkDatepickerComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatLuxonDateModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  // providers: [
  //   {
  //     provide: MAT_DATE_LOCALE,
  //     useValue: 'he-IL'
  //   }
  // ]
})
export class CdkDatepickerModule {}

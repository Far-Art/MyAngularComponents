import {Component} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {LuxonDateAdapter, MAT_LUXON_DATE_ADAPTER_OPTIONS, MAT_LUXON_DATE_FORMATS} from '@angular/material-luxon-adapter';


export const MY_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy', // Format for input parsing
  },
  display: {
    dateInput: 'dd/MM/yyyy', // Format for input display
    monthYearLabel: 'MMMM yyyy', // Format for month-year picker
    dateA11yLabel: 'DD/MM/YYYY', // Accessibility format for full date
    monthYearA11yLabel: 'MMMM yyyy', // Accessibility format for month-year picker
  },
};

@Component({
  selector: 'cdk-datepicker',
  templateUrl: './cdk-datepicker.component.html',
  styleUrls: ['./cdk-datepicker.component.scss'],
  providers: [
    {
      provide: MAT_LUXON_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: false, strictParsing: false, },
    },
    {
      provide: MAT_LUXON_DATE_FORMATS,
      useValue: MY_FORMATS
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'he-IL'
    }
  ]
})
export class CdkDatepickerComponent {

}

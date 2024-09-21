import { Component } from '@angular/core';
import {SelectComponent} from './components/ims-select/select/select.component';
import {OptionComponent} from './components/ims-select/select/option/option.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    SelectComponent,
    OptionComponent
  ],
  standalone: true
})
export class AppComponent {
  title = 'My-Angular-Components';
}

import { Component } from '@angular/core';
import {SelectComponent} from './components/ims-select/select/select.component';
import {OptionComponent} from './components/ims-select/select/option/option.component';
import {AppModule} from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    SelectComponent,
    OptionComponent,
    AppModule
  ],
  standalone: true
})
export class AppComponent {
  title = 'My-Angular-Components';
}

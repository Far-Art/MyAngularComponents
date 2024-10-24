import {AfterViewInit, Component} from '@angular/core';
import {ElementCaptureService} from './services/element-capture.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'My-Angular-Components';

  constructor(private elementCapture: ElementCaptureService) { }

  ngAfterViewInit(): void {

  }

}

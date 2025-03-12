import {AfterViewInit, Component} from '@angular/core';
import {ElementCaptureService} from './services/element-capture.service';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'My-Angular-Components';

  form = new FormGroup({
    input: new FormControl('')
  });

  constructor(private elementCapture: ElementCaptureService) { }

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe(change => {
      console.log(change)
    });
  }

  onValueChange(event: string | null) {
    console.log(event);
  }

}

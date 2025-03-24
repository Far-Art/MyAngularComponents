import {AfterViewInit, Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

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

  ELEMENT_DATA: PeriodicElement[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.ELEMENT_DATA = [
        {
          position: 1,
          name: 'Hydrogen',
          weight: 1.0079,
          symbol: 'H'
        },
        {
          position: 2,
          name: 'Helium',
          weight: 5.0026,
          symbol: 'He'
        },
        {
          position: 3,
          name: 'Helium',
          weight: 4.0026,
          symbol: 'Hee'
        }
      ]
    })

    setTimeout(() => {
      this.ELEMENT_DATA.push(
        {
          position: 1,
          name: 'aaaaa',
          weight: 1.0079,
          symbol: 'H'
        },
        {
          position: 2,
          name: 'aaaaa',
          weight: 5.0026,
          symbol: 'He'
        },
        {
          position: 3,
          name: 'aaaaaa',
          weight: 4.0026,
          symbol: 'Hee'
        })
    }, 2000)

  }

  onTableActivate = (value: PeriodicElement) => {
    console.log(value);
  }

}

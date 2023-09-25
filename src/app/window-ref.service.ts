import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {

  constructor() {
  }

  get windowObject(): any {
    return window;
  }
}

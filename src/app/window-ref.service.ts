import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {

  constructor() {
  }

  get nativeWindow(): any {
    return window;
  }
}

import {enableProdMode} from '@angular/core';
import 'zone.js';
import {bootstrapApplication} from '@angular/platform-browser';
import {environment} from './environments/environment';
import {AppComponent} from './app/app.component';


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent);
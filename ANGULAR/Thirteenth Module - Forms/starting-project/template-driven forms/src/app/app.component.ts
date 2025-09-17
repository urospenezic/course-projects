import { Component } from '@angular/core';

import { LoginComponent } from './auth/login/login.component';
//angular has 2 main ways to manage forms: template-driven and reactive forms
//template driven forms are easier to use but less powerful
//reactive forms: setup via TS code. requires more verbose code, but handling complex forms is easier
//take a look at the login component. 
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginComponent],
})
export class AppComponent {}

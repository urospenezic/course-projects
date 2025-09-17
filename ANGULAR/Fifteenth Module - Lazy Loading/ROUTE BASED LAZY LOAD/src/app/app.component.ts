import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';

//at the initial load, without any lazy load optimization, all the FE code is loaded into the browser
//CHECK THE ROUTES CONFIGS
//WE WILL ALSO LAZY LOAD THE TASKS SERVICE BACAUSE WE DO NOT NEED IT UNTILL WE LOAD THE TASKS COMPONENT (SEE TASKS SERVISE CODE)
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, UsersComponent, RouterOutlet],
})
export class AppComponent {}

import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { RouterOutlet } from '@angular/router';//IT HAS A SPECIAL TAG FOR ROUTED COMPONENTS, THIS WAY THE HEADER FOR EXAMPLE IS NOT RERENDERED AFTER ROUTE CHANGES
//CHECK OUT THE USER COMPONENT AS WELL FOR ROUTE LINKS
//CHECK OUT NEW TASK COMPONENT FOR LINK SHORTCUTS AND CODE BEHIND NAVIGATION
//CHECK OUT USER TASKS COMPONENT FOR NESTED ROUTES AND RESOLVERS
//CHECK OUT APP CONFIG FOR ROUTER CONFIG
//CHECK OUT TASKS COMPONENT FOR INPUT ROUTE SEGMENTATION
//CHEK OUT ROUTES.TS FOR ROUTE SETUPS
//CHECK OUT TASKS COMPONENT FOR QUERY PARAMS
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, UsersComponent, RouterOutlet],
})
export class AppComponent {}

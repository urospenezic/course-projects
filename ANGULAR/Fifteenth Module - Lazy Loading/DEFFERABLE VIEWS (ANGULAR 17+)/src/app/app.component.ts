import { Component } from '@angular/core';

import { WelcomeComponent } from './welcome/welcome.component';
//SPECIAL OFFER COMPONENT - IT DOESNT MAKE SENSE TO SHOW IT UNTIL THE USER CAN SEE IT
//CHECK OUT WELCOME COMPONENT FOR TO SEE HOW WE LOAD <app-offer-preview>
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [WelcomeComponent],
})
export class AppComponent {}

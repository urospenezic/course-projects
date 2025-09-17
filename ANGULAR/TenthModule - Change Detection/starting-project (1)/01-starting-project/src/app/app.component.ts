import { Component } from '@angular/core';

import { CounterComponent } from './counter/counter.component';
import { MessagesComponent } from './messages/messages.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CounterComponent, MessagesComponent],
})
//READ THROUGH EVERYTHING, ALL THE COMMENTS, LOTS OF STUFF ON PERFORMANCE 
//angular will run 2 change detection cycles in development mode to see if there are any unwanted changes occuring on change detection normal cycle (after it)
export class AppComponent {
  get debugOutput() {
    console.log('[AppComponent] "debugOutput" binding re-evaluated.');
    return 'AppComponent Component Debug Output';
    //if we return Math.random() here it will throw a ExpressionChangedAfterItHasBeenCheckedError on the second cycle of change detection that runs in dev mode.
    //check counter component ts
    //now, there is an alternative change detection strategy that is called OnPush strategy that can significantly improve performance. it is enabled on per component basis.ck messages component
  }
}

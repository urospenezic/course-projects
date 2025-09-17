import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { MessagesListComponent } from './messages-list/messages-list.component';
import { NewMessageComponent } from './new-message/new-message.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  imports: [MessagesListComponent, NewMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush, //change detection is set to OnPush, meaning that by default it will not run change detection for MessagesComponent, NewMessageComponent and MessagesList component
  //on push strategy tells angular that the only change that can happen that results in visual changes will happen inside this components template subtree (so no parent can cause this component to rerender)
  //of course, we can still manually trigger change detection for this component by calling changeDetection.detectChanges()
  //on push does not prevent change detection on components that rely on this components subtree data (so a keystroke in new message component will still trigger change detection in counter component)
  //so it seems like on push is like async await in a sense that you kinda go all in on it
})
export class MessagesComponent {
  //messages = signal<string[]>([]);

  get debugOutput() {
    console.log('[Messages] "debugOutput" binding re-evaluated.');
    return 'Messages Component Debug Output';
  }

  // onAddMessage(message: string) {
  //   this.messages.update((oldMessages) => [...oldMessages, message]);
  // }
}

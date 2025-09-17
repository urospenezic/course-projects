import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  SimpleChanges,
} from '@angular/core';
import { MessagesService } from '../messages.service';
//import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  //imports: [AsyncPipe],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush, //if we leave this at deafult, typing text into new message component will trigger a change detection cycle for messages list component
  //signal changes will also cause change detection to run even with on push strategy. so if we're using services for cross component communication, we need to be careful with this and use signals in services (otherwise the UI will not update)
  //otherwise we will have to manually trigger change detection for the component that is using the service
})
export class MessagesListComponent {
  //messages = input.required<string[]>();
  //************* START OF LONG VERSION OF RXJS SUBSCRIPTIONS ******************* */

  //in case we're not using signals in this messages service, we can manually trigger change detection for the component that is using the service
  //we're going to listen to changes manually with the help of rxJs (check the service)
  ///for rxJs: (THERE IS A SHORTCUT FOR THIS, SO THAT WE DO NOT MANUALLY TRACK DESTROYREF + CDR + SUBSCRIPTIONS )
  // messages:string[] = []; //no signal
  //private destroyRef = inject(DestroyRef);
  //private cdr = inject(ChangeDetectorRef);

  //WE CAN GET RID OF THIS:
  //ngOnInit(): void {//when using rxJs, we need to subscribe to the property to get the latest value. ALSO THESE SUBSCRIPTIONS ARE NOT UNSUBSCRIBED AUTOMATICALLY, SO WE NEED TO DO IT MANUALLY
  // const subscription = this.messagesService.messages$.subscribe((messages) => {
  //   this.messages = messages;
  //   this.cdr.markForCheck();//triggers change detection cycle for this component
  // });
  //this.destroyRef.onDestroy(() => {
  //  subscription.unsubscribe();
  //});
  //}

  //************* END OF LONG VERSION OF RXJS SUBSCRIPTIONS ******************* */

  //************* START OF SHORTCUT VERSION OF RXJS SUBSCRIPTIONS ******************* */

  //messages$ = this.messagesService.messages$; //now that we have a BehaviorSubject here, we can use a special pipe in html to listen to changes
  //THE PIPE WILL AUTOMATICALLY UNSUBSCRIBE FROM THE OBSERVABLE WHEN THE COMPONENT IS DESTROYED
  //************* END OF SHORTCUT VERSION OF RXJS SUBSCRIPTIONS ******************* */

  private messagesService = inject(MessagesService);
  messages = this.messagesService.allmessages;

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}

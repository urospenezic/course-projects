import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  //rxjs: 
  //private messagesSubject = new BehaviorSubject<string[]>([]); //wrapper around a value similar to signal
  //messages$ = this.messagesSubject.asObservable(); // $ is the convention for observables in rxJs

  private messages = signal<string[]>([]);
  allmessages = this.messages.asReadonly();

  addMessage(message: string) {
    this.messages.update((oldMessages) => [...oldMessages, message]);
    //for rxjs:
    //this.messages = [...this.messages, message]; 
    //this.messages$.next([...this.messages])); // we're emmiting this value to all subscribers (not the original value, so that someone doesnt accidentally mutate the original value)
  }
}

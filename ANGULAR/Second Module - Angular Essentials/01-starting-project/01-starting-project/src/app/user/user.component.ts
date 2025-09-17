import {
  Component,
  Input,
  input,
  Output,
  output,
  computed,
  signal,
  EventEmitter,
} from '@angular/core';
import { User } from './user.model';
import { CardComponent } from '../shared/card/card.component';

//const random = Math.floor(Math.random() * DUMMY_USERS.length);
//WE CAN CREATE A COMPONENT BY USING THE CLI, BY TYPING "ng generate component user"
//string interpolation is done by using {{}}
//property binding is done by using [], e.g. [src] = "selectedUser.avatar"
//event binding is done by using (), e.g. (click) = "onSelectUser()". we can also update state with signals
//signals are a way to update state in Angular, we have to first import the signal from @angular/core and then use it like this: const selectedUser = signal(DUMMY_USERS[random]) instead of const selectedUser = DUMMY_USERS[random];
//it is recommended to use signals instead of just reassigning the value because it is more efficient and easier to manage. without them, angular creates a zone around the component that listens for all kinds of changes, like any mouse click will trigger a change detection cycle
//two way binding is done by using [(ngModel)] = "selectedUser.name"
//ngModel is a directive that is used to bind the value of the input field to the selectedUser.name
//to create a dynamic path, we can use the following syntax: [src]="'assets/users/' + selectedUser.avatar"
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  //user = input.required<{ id: string; avatar: string; name: string }>();
  user = input.required<User>();
  isSelected = input.required<boolean>();
  //@Input({required: true}) id! : string;
  //@Input() avatar: string = ''; //input is a decorator tha allows us to set the value of property from outside of component, like in the parent component. this is in WPF terms a dependency property
  //@Input({required: true}) name!: string;//the exclamation mark is used to tell typescript that the value will be assigned later. if required is true, we will get an error if the value is not assigned in the parent component
  //alternative syntax: avatar = input<string>(); and name = input.required<string>(); these are called signal inputs. setting these in html is the same as the previous syntax, we can still use bindings the same way.
  //if we use signal inputs, we have to use the signal as a function to update the value instead of just reassigning the value in html of user.component.html e.g. <span {{name()}}>

  //@Output() selectUser = new EventEmitter<string>();//output is a decorator that allows us to emit events from the component. we can use it to communicate with other components. event emitter is like a routed event in WPF.
  //other components listen to this event in html by binding to it like this: (selectUser)="onUserSelected($event)". the $event is a way of getting the ommited value from the event. so in this case, the $event value is the id of the user.
  //alternative syntax:
  selectUser = output<string>();

  onSelectUser() {
    this.selectUser.emit(this.user().id); //emits the event to the parent component with users id as args
    //const randomUser = Math.floor(Math.random() * DUMMY_USERS.length);
    //for signals, we have to use the set method to update the value instead of just reassigning the value
    //this.selectedUser.set(DUMMY_USERS[randomUser]);
    //set will not work on input signals.
  }

  //selectedUser = signal(DUMMY_USERS[random]);//container that stores the selected user value. once that value changes, angular will get notified and will find any templates that depends on that value and will update the DOM accordingly
  //imagePath = computed(() => 'assets/users/' + this.avatar());//computed is a function that returns a value, its a way to compute values when using signals. computed sets a subscription to the selectedUser signal and will re-evaluate the expression whenever the selectedUser signal changes
  get imagePath() {
    return 'assets/users/' + this.user().avatar; //avatar() if we use signals
  }
}
/*In the previous lecture, you were introduced to "Property Binding" - a key Angular feature that allows you to bind element properties to dynamic values.

For example, <img [src]="someSrc"> binds the src property of the underlying HTMLImageElement DOM object to the value stored in someSrc.

Whilst it might look like you're binding the src attribute of the <img> tag, you're actually NOT doing that. Instead, property binding really targets the underlying DOM object property (in this case a property that's also called src) and binds that.

This might look like a subtle detail (and often it indeed doesn't matter) but it's important to understand this difference between element attributes and property. This article can help with understanding this difference.

Whilst it won't make a difference in Angular apps in many cases, it DOES matter if you're trying to set attributes on elements dynamically. Attributes which don't have an equally-named underlying property.

For example, when binding ARIA attributes, you can't target an underlying DOM object property.

Since "Property Binding" wants to target properties (and not attributes), that can be a problem. That's why Angular offers a slight variation of the "Property Binding" syntax that does allow you to bind attributes to dynamic values.

It looks like this:

<div 
  role="progressbar" 
  [attr.aria-valuenow]="currentVal" 
  [attr.aria-valuemax]="maxVal">...</div>
By adding attr in front of the attribute name you want to bind dynamically, you're "telling" Angular that it shouldn't try to find a property with the specified name but instead bind the respective attribute - in the example above, the aria-valuenow and aria-valuemax attributes would be bound dynamically.
*/

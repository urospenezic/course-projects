import {
  Component,
  input,
  ViewEncapsulation,
  inject,
  ElementRef,
  contentChild,
  AfterContentInit,
  afterRender,
  afterNextRender,
} from '@angular/core';
//EACH COMPONENT HAS ITS HOST ELEMENT, WHICH IN THIS CASE IS APP-INPUT, WHICH GETS RENDERED DIRECTLY IN THE DOM
//FOR THE ICON BUTTON COMPONENT, THE HOST ELEMENT IS A BUTTON WITH THE ATTRIBUTE appIconButton
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  encapsulation: ViewEncapsulation.None, //encapsulation can mess up host element styling because the :host selector is not scoped to the component,
  host: {
    //manipulates the host element, adding a class to it in this example
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class InputComponent implements AfterContentInit {
  constructor() {
    afterRender(() => { // triggers after each render on the entire app
      //code that runs whenever anything changes anywhere
      console.log('afterRender');
    });

    afterNextRender(() => { // triggers after the next render
      //code that runs whenever the next change happens anywhere in the app.
      console.log('afterNextRender');
    });
  }
  //alternative to setting host in the component decorator, we can do this: @HostBinding('class') className = 'control'. this way is deprecated nowadays
  //there is also a @HostListener decorator, which is used to listen for events on the host element. syntax: @HostListener('eventName', ['$event']) onEvent(event: Event)
  label = input.required<string>();
  private hostElement = inject(ElementRef); // provides us a programmatic access to the host element
  private content =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input'); //gets the projected content reference from the template. but not this template, the projected template. so if we pass an element to this ng-content, if that element has #input, then this will get that reference
  onClick() {
    console.log(this.hostElement);
    console.log(this.content());
  }
  ngAfterContentInit(): void {
    console.log(this.content());
  }
}

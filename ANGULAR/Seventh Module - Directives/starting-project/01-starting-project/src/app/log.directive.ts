import { Directive, ElementRef, inject } from '@angular/core';
//THIS IS A COMPONENT MEANT TO BE IHERITED BY COMPONENTS THAT NEED TO LOG EVENTS, SO ITS NOT ADDED TO EVERY SINGLE HTML ELEMENT BY HAND
//CHECK THE AUTH COMPONENTS DECORATOR FOR HOST DIRECTIVES AS WELL AS THE SAFE LINK DIRECTIVE FOR HOST DIRECTIVES (YIS, WE CAN TRACK DIRECTIVES WITH OTHER DIRECTIVES)
@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'log()',
  },
})
export class LogDirective {
  private elementRef = inject(ElementRef);
  log() {
    console.log('clicked', this.elementRef.nativeElement);
  }
}

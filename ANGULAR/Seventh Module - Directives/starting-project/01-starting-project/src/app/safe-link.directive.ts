//ng g d is the command to generate a directive
import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from './log.directive';
//CHECK HTML OF LEARNING RESOURCES COMPONENT FOR THE DIRECTIVE
//this is an example of a attribute directive
@Directive({
  selector: 'a[appSafeLink]', //we typically use attribute selectors for directives. doesnt matter which attribute we use, but it should start with app
  standalone: true,
  host: {
    click: 'onConfirmLeavePage($event)',
  },
  hostDirectives: [LogDirective],
})
export class SafeLinkDirective {
  from = input<string>('myapp'); //we can add a alias for the input with the value of 'appSafeLink'. if we do that, in html of learning resources component, we can use the alias instead of the input name, so the html would be cleaner like this: <a href="https://academind.com/courses" appSafeLink="myapp-academind-link">Academind Courses</a>
  private hostElementRef = inject(ElementRef); //directives support DI as well

  constructor() {
    console.log('SafeLinkDirective constructor');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const ifWantsToLeave = window.confirm(
      'Are you sure you want to leave this page?'
    );

    if (!ifWantsToLeave) {
      event.preventDefault(); //prevent the default behavior of the link
      return;
    }

    //if the user wants to leave, we will append a query param to the url so that the guys we navigate to can track where the user came from
    if (event.target instanceof HTMLAnchorElement) {
      const address = event.target.href + '?from=' + this.from();
      event.target.href = address;
    }
  }
}

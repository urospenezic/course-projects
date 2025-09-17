import {
  Directive,
  inject,
  ViewContainerRef,
  TemplateRef,
  input,
  effect,
} from '@angular/core';

import { AuthService } from './auth.service';
import { Permission } from './auth.model';

//this is an example of a structural directive
@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  //we should be able to use this on some element that should be rendered conditionally based on the auth status
  userType = input.required<Permission>({ alias: 'appAuth' });

  private authService = inject(AuthService);
  private viewContainerRef = inject(ViewContainerRef); //direct reference to the place in the dom where the directive is used
  private templateRef = inject(TemplateRef); //in case we're wrapping our html element with ng-template (so we do not have to use * in directive, and we put the directive as an attribute in <ng-template> tag), we need to use TemplateRef. so the existance of this injections signals devs that it's meant to be used with ng-template
  //the good part about <ng-template> is that we can put as manyh elements into it as we want, and one directive can be used on multiple elements at the same time
  //adding * in front of the directive is a syntactic sugar for using ng-template under the hood
  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef); //tells angular to render the new content into a certain place in the dom
      } else {
        this.viewContainerRef.clear(); //clears the content of the place in the dom where the directive is used
      } //by default, content written into <ng-template> is not rendered
    });
  }
}

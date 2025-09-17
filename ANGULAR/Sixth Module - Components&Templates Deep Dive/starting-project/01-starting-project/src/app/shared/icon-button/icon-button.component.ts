import { Component, input } from '@angular/core';
/*
            CONTENT PROJECTION
 * keep in mind that app-icon-button will be rendered in DOM, so we will have <app-icon-button><button>...</button></app-icon-button>, which is reduntant. so we want to extend the button component, not wrap around it.
 * therefore, there is no need to use <button>...</button> in the html file.
 * we can solve this with attribute selectors. so instead of selector: 'app-icon-button', we can use selector: 'button[appIconButton]'
 * this way, this custom component will be rendered in the DOM as a button, but only in place of the button element that has the appIconButton attribute.
 * these selectors work just like css selectors. so we can use class selectors, attribute selectors, etc.
 * keep in mind that it is a good practice to prefix the attribute with app, so that it is clear that it is a custom component attribute.
 */

//CHECK OUT CSS TO SEE HOW WE TARGET HOST ELEMENTS
@Component({
  selector: 'button[appIconButton], a[appIconButton]',
  standalone: true,
  imports: [],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.css'
})
export class IconButtonComponent {
  //in this example, we will use ng-content to pass the label and icon to the component.
  //problem is that ng-content doesnt know by default which element goes into which span by default. we have to add a selector to the ng-content like this: <ng-content select=".icon"/>.
  //so any calling code has to do this: <button appIconButton>Label <span class="icon">Icon</span></button>

  /*
  another way to solve this is by using ngProjectAs.
  our calling code will be: <button appIconButton> Label <span ngProjectAs="icon">Icon</span></button>
  and in the component, we will use: <ng-content select="icon" />
  this way, we can use the icon element as a projectAs element.
  */
}

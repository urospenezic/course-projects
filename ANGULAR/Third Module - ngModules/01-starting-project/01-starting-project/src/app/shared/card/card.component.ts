import { Component } from '@angular/core';
//this is a shared component, empty shell used to wrap other components. in wpf terms, it is like a content control or a content presenter.
//check ng-content in card.component.html
@Component({
  selector: 'app-card',
  standalone: false,
  //imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

}

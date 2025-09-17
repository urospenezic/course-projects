import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild, output } from '@angular/core';
import { IconButtonComponent } from '../../../shared/icon-button/icon-button.component';
import { InputComponent } from '../../../shared/input/input.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [IconButtonComponent, InputComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements AfterViewInit, OnInit {
  ticketCreated = output<{title: string, description: string}>();
  //we can reference the template variables in the component class (template variables are defined in the template with #variableName), or we can pass them as reference to onSubmit directly in html
  //@ViewChild('mainForm') form?: ElementRef<HTMLFormElement>;  //this is a reference to the form element in the template. selector can be a string, can be a type. there is also @ViewChildren if we want to get multiple elements
  private form = viewChild.required<ElementRef<HTMLFormElement>>('mainForm');//signal way of doing it. required guarantees that the form will be found. so that forces devs to have it in the template
  //apart from viewChild, there is contentChild - check the input component for that
  //noe that not all template variables will return a html element, for example button returns ButtonComponent
  onSubmit(title:string, ticketText:string/*titleElement: HTMLInputElement, requestElement: HTMLTextAreaElement*/) {
    // console.log(titleElement.value);
    // console.log(requestElement.value);
    this.ticketCreated.emit({title, description: ticketText});
    this.form().nativeElement.reset();//resets the form to its initial state
  }
  ngAfterViewInit(): void {//after view init is called after the view children are initialized. so we can access the form element. it guarantees that the view children are safe to be searched for
    //same goes for content, that why we have ngAfterContentInit. check the input component for that
    console.log(this.form().nativeElement);
  }
  ngOnInit(): void {
    //Called after ngOnChanges, ngOnInit, and ngDoCheck.
    //it is not guaranteed that this.form() exists at this point, so we need to use ngAfterViewInit. so calling console.log(this.form()) here will return undefined
  }
}

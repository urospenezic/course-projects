import {
  Component,
  Input,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.css',
})
export class LifecycleComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() text?: string;

  constructor() {
    console.log('CONSTRUCTOR');
  }

  ngOnInit() {//triggered when the component is initialised. we can use it to fetch data from the server, or to set up subscriptions.
    console.log('ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges) {//triggered when the input changes. we can acces each individual input as a property of the changes object. there we can check current and previous values, as well as the firstChange property (boolean) - so that we know if the change came from initialisation or not.
    console.log('ngOnChanges');
    console.log(changes);
  }

  ngDoCheck() {//triggered whenever angular thinks the UI has to be updated, so will be triggered a lot
    console.log('ngDoCheck');
  }

  ngAfterContentInit() {//content is the projected contentent like <ng-content>. this triggers when it is initialised.
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked() {//triggered after the content is checked
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit() {//view is the template of the component. it is the html that is rendered in the browser.
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy() {//triggered when the component is destroyed. we can use it to clean up subscriptions, or to remove event listeners. (not just deleted, not rendered will trigger this as well. so if a component was conditionally rendered, and then the condition changed, this would trigger)
    console.log('ngOnDestroy');
  }
}

import { Component, input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css',
})
export class TextInput implements ControlValueAccessor {
  //ControlValueAccessor tells angular this is a form control

  label = input<string>('');
  type = input<string>('text'); //text, password, email, etc
  //@Self() tells the angular to only look up the ref we're injecting on the current element, not to seach it up the injector tree
  //it guarntees that this control is unique for this text input we use inside of form
  constructor(@Self() public ngControl: NgControl) {
    ngControl.valueAccessor = this; //bind this control value accessor to the ngControl
  }

  writeValue(value: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  get control() {
    return this.ngControl.control as FormControl;
  }
}

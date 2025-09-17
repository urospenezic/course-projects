import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  AbstractControl,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

//validator used for form group to match 2 controls values (in this case, password and confirm password)
//ofc, we still need css styles to actually mark these as invalid
// function passwordMatchValidator(control: AbstractControl) {
//   const password = control.get('password')?.value;
//   const confirmPassword = control.get('confirmPassword')?.value;
//   return password === confirmPassword ? null : { passwordMismatch: true };
// }

//refactor to use a factory:
//NOTICE HOW THE CALLING CODE CHANGES (WE PASS THE CONTROL NAME AND THE MATCHING CONTROL NAME)
function equalValuesValidator(
  controlName: string,
  matchingControlName: string
) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName)?.value;
    const val2 = control.get(matchingControlName)?.value;
    return val1 === val2 ? null : { passwordMismatch: true };
  };
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  //form setup:
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    ///since these 2 controls are now nested, we need to correctly reference them in html (LIKE [formGroup]="passwords" OR formGroupName="passwords" in the passwords div)
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ], //must have 1 uppercase, 1 lowercase, 1 number, 1 special character
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(8)], //must be the same as password
        }),
      },
      { validators: [equalValuesValidator('password', 'confirmPassword')] }
    ), //form group also takes a 2nd argument, which is a config object
    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
    //registering nested form group:
    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required],
      }),
      number: new FormControl('', {
        validators: [Validators.required],
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required],
      }),
      city: new FormControl('', {
        validators: [Validators.required],
      }),
    }),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', {
      validators: [Validators.required],
    }),
    //working with arrays: (used whenever we have a list of controls, but dont need to specify a name per control) (CHECK HTML, WE USE NUMBERS LIKE INDEXES FOR NAMES)
    //since these are checkboxes in HTML, we set the initial value of each item to false (that way nothing is selected by default)
    //this array can also be found in forms value property as an array of booleans
    sources: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    terms: new FormControl<boolean>(false, {
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      //window.localStorage.setItem('saved-form-value', JSON.stringify(value));
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('form is invalid');
      return;
    }
    console.log(this.form.value);
  }
  onReset() {
    this.form.reset();
  }
}

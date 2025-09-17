import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule, //NEED FOR HOOKING THE FORM TO THE HTML
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

//we can also build custom validators (for template-driven forms its more complicated because we need to implement custom directives as well as validator classes etc)
//for reactive forms we can use validator functions:
function startsWithUpperCase(control: AbstractControl) {
  const value = control.value as string;
  if (value && value[0] !== value[0].toUpperCase()) {
    return { doesNotStartWithUpperCase: true };
  }
  //null signals success?
  return null;
}

function dummyAsyncValidator(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    //dummy taken email (already in use)
    return of(null); //of is an rxjs function that instantly produces an observable based on the value passed to it (in this case null to signal success)
  }
  return of({ notUnique: true });
}

//THIS WAY WE'RE LOADING LOCAL STORAGE DECOUPLED FORM THE COMPONENT
let initialEmailValue = '';
let initialPasswordValue = '';

const savedForm = window.localStorage.getItem('saved-form-value');
if (savedForm) {
  const data = JSON.parse(savedForm);
  initialEmailValue = data.email;
  initialPasswordValue = data.password;
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  //instanciate a form code behind
  form = new FormGroup({
    //NOTE: we can dynamically add validators to the form control later, by usint addValidators() method
    email: new FormControl(initialEmailValue, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [dummyAsyncValidator],
    }),
    password: new FormControl(initialPasswordValue, {
      //if passed an object, we can define validators, async validators, specify that the value is nonNullable (in case of reset) and specify updateOn (onBlur, onSubmit, onChange)
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          //password regex, at least 8 characters, one uppercase, one lowercase, one number, one special character
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
        startsWithUpperCase,
      ],
    }),
  });

  get isEmailInvalid(): boolean {
    return (
      this.form.controls.email.invalid &&
      this.form.controls.email.touched &&
      this.form.controls.email.dirty
    );
  }

  get isPasswordInvalid(): boolean {
    return (
      this.form.controls.password.invalid &&
      this.form.controls.password.touched &&
      this.form.controls.password.dirty
    );
  }

  ngOnInit() {
    //load from storage (ONE WAY OF DOING IT, WE CAN ALSO LOAD LOCAL STORAGE AS THIS FILE GETS EXECUTED):
    // const savedValue = window.localStorage.getItem('saved-form-value');
    // if (savedValue) {
    //   const parsedValue = JSON.parse(savedValue);
    //   //now we can properly update the form with the saved value unlike with template-driven forms
    //   this.form.patchValue({
    //     email: parsedValue.email,
    //     password: parsedValue.password,
    //   });
    // }
    //with reactive forms we know when the form is instantiated, so there's no need to set timers or do any "fixing" like we do in template-driven forms
    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-form-value',
            JSON.stringify({ email: value.email, password: value.password })
          );
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSubmit() {
    console.log(this.form.value);
    //one of the benefits here is that typescript now knows the type of the form value, so we can access this.form.email or this.form.value.email without any type errors (value would be of type any if we didn't use formGroup in codebehind)
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}

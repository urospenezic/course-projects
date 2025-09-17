import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
//check out all the ng model directives in html for form validation
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    //we gotta use afterNextRender because the form is not available the first time template is rendered
    afterNextRender(() => {
      //load the saved form data from local storage if it exists
      const savedFormData = window.localStorage.getItem(
        'saved-login-form-data'
      );
      if (savedFormData) {
        const data = JSON.parse(savedFormData);
        setTimeout(() => {
          //this is a workaround to avoid the error because the form is not initialized yet (the ngForm exists after first render, but its children may not be intialized yet, so calling setValue on it will throw an error)
          this.form().form.setValue({
            email: data.email,
            password: data.password,
          });
        }, 1);
      }

      const subscription = this.form()
        .valueChanges?.pipe(
          debounceTime(500) //wait 500ms before saving the form data, since we dont wanna spamm the local storage constantly
        )
        .subscribe({
          next: (value) => {
            window.localStorage.setItem(
              //save the form data with every keystroke so that we can reload it on refresh
              'saved-login-form-data',
              JSON.stringify({ email: value.email, password: value.password })
            );
          },
        });

      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      });
    });
  }

  onSubmit(formData: NgForm) {
    //there is also a status property to check if the form is valid or invalid (beacause even though we have required directives, user can still submit the form without filling the fields)
    // if (formData.status === 'INVALID') {
    //   return;
    // }
    //OR IN SHORT:
    if (formData.form.invalid) {
      return;
    }

    //there is also errors property which is an object with a key for each form control with registered name
    //e.g. {email: true, password: true}
    // console.log(formData.form.errors);

    // console.log(formData.form);
    // value property is an object that contains all the values of the form (e.g. email and password)
    //the ng form also has touched property to check if the user has interacted with the form (e.g. wrote something in the input field)
    const data = formData.form.value;

    //console.log(data.email);
    //console.log(data.password);

    formData.form.reset();
  }
}

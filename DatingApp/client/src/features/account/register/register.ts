import { Component, output, inject, OnInit } from '@angular/core';
import { RegisterCreds } from '../../../types/user';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { JsonPipe } from '@angular/common';
import { TextInput } from '../../../shared/text-input/text-input';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe, TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly accountService = inject(AccountService);
  protected registerForm: FormGroup = new FormGroup({});
  protected creds = {} as RegisterCreds;
  cancelRegister = output<boolean>();

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });

    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      //all angular field inputs derive from AbstractControl
      const parent = control.parent as FormGroup;
      if (!parent) return null;

      const matchValue = parent.get(matchTo)?.value;
      if (control.value === matchValue) return null;

      return { passwordMissmatch: true };
    };
  }

  register() {
    console.log('Register form submitted:', this.registerForm.value);
    // this.accountService.register(this.creds).subscribe({
    //   next: (user) => {
    //     console.log('Registration successful:', user);
    //     this.cancel();
    //   },
    //   error: (error) => {
    //     console.error('Registration failed:', error);
    //   },
    // });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}

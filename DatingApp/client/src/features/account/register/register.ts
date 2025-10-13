import { Component, output, inject, OnInit, signal } from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly accountService = inject(AccountService);
  private readonly router = inject(Router);
  protected registerForm: FormGroup = new FormGroup({});
  protected creds = {} as RegisterCreds;
  protected credentialsForm: FormGroup = new FormGroup({});
  protected profileForm: FormGroup = new FormGroup({});
  protected currentStep = signal<number>(1);
  protected validationErrors = signal<string[]>([]);
  cancelRegister = output<boolean>();

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });

    this.profileForm = this.formBuilder.group({
      gender: ['male', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });

    // Update confirmPassword validity when password changes
    this.credentialsForm.controls['password'].valueChanges.subscribe(() => {
      this.credentialsForm.controls['confirmPassword'].updateValueAndValidity();
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
    if (this.credentialsForm.valid && this.profileForm.valid) {
      const formData = { ...this.credentialsForm.value, ...this.profileForm.value };
      this.accountService.register(formData).subscribe({
        next: () => {
          this.router.navigateByUrl('/members');
        },
        error: (error) => {
          console.error('Registration failed:', error);
          //sent by model state property in error interceptor
          this.validationErrors.set(error);
        },
      });
    }
  }

  nextStep() {
    if (this.currentStep() === 1 && this.credentialsForm.valid) {
      this.currentStep.update((prevStep) => prevStep + 1);
    }
  }

  previousStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update((step) => step - 1);
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}

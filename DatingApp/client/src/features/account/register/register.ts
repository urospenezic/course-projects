import { Component, input, output, inject } from '@angular/core';
import { RegisterCreds, User } from '../../../types/user';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly accountService = inject(AccountService);
  protected creds = {} as RegisterCreds;
  cancelRegister = output<boolean>();

  register() {
    this.accountService.register(this.creds).subscribe({
      next: (user) => {
        console.log('Registration successful:', user);
        this.cancel();
      },
      error: (error) => {
        console.error('Registration failed:', error);
      },
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}

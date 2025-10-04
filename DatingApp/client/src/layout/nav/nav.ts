import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected creds: any = {};
  protected readonly accountService = inject(AccountService);

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.creds = {};
      },
      error: (error) => {
        alert('Login failed:' + error.message);
      },
    });
  }

  logout() {
    this.accountService.logout();
  }
}

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

  protected loggedIn = signal<boolean>(false);

  private readonly accountService = inject(AccountService);

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.loggedIn.set(true);
      },
      error: (error) => {
        alert('Login failed:' + error.message);
      },
    });
  }

  logout() {
    this.loggedIn.set(false);
  }
}

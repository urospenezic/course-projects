import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected creds: any = {};
  private router = inject(Router);
  protected readonly accountService = inject(AccountService);
  private readonly toastService = inject(ToastService);

  login() {
    this.accountService.login(this.creds).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.toastService.success('Login successful');
        this.creds = {};
      },
      error: (error) => {
        this.toastService.error('Login failed: ' + error.message);
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}

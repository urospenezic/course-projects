import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
import { themes } from './theme';
import { BusyService } from '../../core/services/busy-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  protected selectedTheme = signal(localStorage.getItem('theme') || 'light');
  protected themes = themes;
  protected creds: any = {};
  private router = inject(Router);
  protected readonly accountService = inject(AccountService);
  private readonly toastService = inject(ToastService);
  protected readonly busyService = inject(BusyService);

  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }

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

  handleSelectTheme(theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    var elem = document.activeElement as HTMLDivElement;
    if (elem) {
      elem.blur();
    }
  }
}

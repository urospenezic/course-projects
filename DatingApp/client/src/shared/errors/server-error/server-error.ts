import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from '../../../types/error';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
})
export class ServerError {
  private readonly router = inject(Router);
  protected error = signal<ApiError | null>(null);
  protected showDetails = signal(false);

  constructor() {
    const navigation = this.router.currentNavigation();
    this.error.set(navigation?.extras?.state?.['error']);
  }

  toggleDetails() {
    this.showDetails.set(!this.showDetails());
  }
}

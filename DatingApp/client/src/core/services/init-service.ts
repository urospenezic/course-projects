import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private readonly accountService = inject(AccountService);

  init() {
    const user = localStorage.getItem('user');
    if (!user) {
      return of(false);
    }
    this.accountService.setCurrentUser(JSON.parse(user));

    return of(true);
  }
}

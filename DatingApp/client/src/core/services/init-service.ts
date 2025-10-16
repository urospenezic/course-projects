import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { of } from 'rxjs';
import { LikesService } from './likes-service';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private readonly accountService = inject(AccountService);
  private readonly likesService = inject(LikesService);

  init() {
    const user = localStorage.getItem('user');
    if (!user) {
      return of(false);
    }
    this.accountService.setCurrentUser(JSON.parse(user));
    this.likesService.getLikeIds();
    return of(true);
  }
}

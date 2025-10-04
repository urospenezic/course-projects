import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private httpClient = inject(HttpClient);

  baseUrl = 'https://localhost:7241/api/';
  currentUser = signal<User | null>(null);

  login(creds: any) {
    return this.httpClient.post<User>(this.baseUrl + 'account/login', creds).pipe(
      tap((user) => {
        this.setCurrentUser(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  register(creds: RegisterCreds) {
    return this.httpClient.post<User>(this.baseUrl + 'account/register', creds).pipe(
      tap((user) => {
        this.setCurrentUser(user);
      })
    );
  }

  setCurrentUser(user: User) {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }
}

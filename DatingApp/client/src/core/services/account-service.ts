import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private httpClient = inject(HttpClient);

  baseUrl = 'https://localhost:7241/api/';

  login(creds: any) {
    return this.httpClient.post(this.baseUrl + 'account/login', creds);
  }
}

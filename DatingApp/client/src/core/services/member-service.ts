import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../../types/member';
import { AccountService } from './account-service';
import { User } from '../../types/user';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getMembers() {
    return this.httpClient.get<Member[]>(`${this.apiUrl}/members`);
  }
  getMember(id: string) {
    return this.httpClient.get<Member>(`${this.apiUrl}/members/${id}`);
  }

  updateMember(member: Member) {
    return this.httpClient.put(`${this.apiUrl}/members`, member);
  }

  setMainPhoto(photoId: number) {
    return this.httpClient.put(`${this.apiUrl}/members/set-main-photo/${photoId}`, {});
  }

  deletePhoto(photoId: number) {
    return this.httpClient.delete(`${this.apiUrl}/members/delete-photo/${photoId}`);
  }
}

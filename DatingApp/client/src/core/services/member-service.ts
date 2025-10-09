import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../../types/member';
import { AccountService } from './account-service';
import { User } from '../../types/user';
import { Photo } from '../../types/photo';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  //hacky way to have edit mode across components, should be replaced with state management
  public editMode = signal(false);

  getMembers() {
    return this.httpClient.get<Member[]>(`${this.apiUrl}/members`);
  }
  getMember(id: string) {
    return this.httpClient.get<Member>(`${this.apiUrl}/members/${id}`);
  }

  getMemberPhotos(id: string) {
    return this.httpClient.get<Photo[]>(`${this.apiUrl}/members/${id}/photos`);
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

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { EditableMember, Member } from '../../types/member';
import { Photo } from '../../types/photo';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public member = signal<Member | null>(null);

  //hacky way to have edit mode across components, should be replaced with state management
  public editMode = signal(false);

  getMembers() {
    return this.httpClient.get<Member[]>(`${this.apiUrl}/members`);
  }
  getMember(id: string) {
    return this.httpClient
      .get<Member>(`${this.apiUrl}/members/${id}`)
      .pipe(tap((member) => this.member.set(member)));
  }

  getMemberPhotos(id: string) {
    return this.httpClient.get<Photo[]>(`${this.apiUrl}/members/${id}/photos`);
  }

  updateMember(member: EditableMember) {
    return this.httpClient.put(`${this.apiUrl}/members`, member);
  }

  uploadPhoto(photo: File) {
    const formData = new FormData();
    formData.append('file', photo);
    return this.httpClient.post<Photo>(`${this.apiUrl}/members/upload-photo`, formData);
  }

  setMainPhoto(photoId: number) {
    return this.httpClient.put(`${this.apiUrl}/members/set-main-photo/${photoId}`, {});
  }

  deletePhoto(photoId: number) {
    return this.httpClient.delete(`${this.apiUrl}/members/delete-photo/${photoId}`);
  }
}

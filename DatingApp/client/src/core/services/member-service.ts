import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { EditableMember, Member, MemberParams } from '../../types/member';
import { Photo } from '../../types/photo';
import { tap } from 'rxjs/internal/operators/tap';
import { PaginatedResult } from '../../types/pagination';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public member = signal<Member | null>(null);

  //hacky way to have edit mode across components, should be replaced with state management
  public editMode = signal(false);

  getMembers(memberParams: MemberParams) {
    let params = new HttpParams();
    params = params.append('pageNumber', memberParams.pageNumber.toString());
    params = params.append('pageSize', memberParams.pageSize.toString());
    params = params.append('minAge', memberParams.minAge.toString());
    params = params.append('maxAge', memberParams.maxAge.toString());
    params = params.append('orderBy', memberParams.orderBy);
    if (memberParams.gender) {
      params = params.append('gender', memberParams.gender);
    }
    //params is the name of the property that HttpClient expects, that's why we pass it like this. if we named our variable differently it would not work
    return this.httpClient.get<PaginatedResult<Member>>(`${this.apiUrl}/members`, { params }).pipe(
      tap(() => {
        localStorage.setItem('filters', JSON.stringify(memberParams));
      })
    );
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
    return this.httpClient.post<Photo>(`${this.apiUrl}/members/add-photo`, formData);
  }

  setMainPhoto(photoId: number) {
    return this.httpClient.put(`${this.apiUrl}/members/set-main-photo/${photoId}`, {});
  }

  deletePhoto(photoId: number) {
    return this.httpClient.delete(`${this.apiUrl}/members/delete-photo/${photoId}`);
  }
}

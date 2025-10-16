import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../../types/member';
import { PaginatedResult } from '../../types/pagination';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private baseUrl = environment.apiUrl + '/likes';
  private http = inject(HttpClient);
  likeIds = signal<string[]>([]);

  toggleLike(targetMemberId: string) {
    return this.http.post(this.baseUrl + '/' + targetMemberId, {});
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    return this.http.get<PaginatedResult<Member>>(
      this.baseUrl +
        '?predicate=' +
        predicate +
        '&pageNumber=' +
        pageNumber +
        '&pageSize=' +
        pageSize
    );
  }

  getLikeIds() {
    return this.http.get<string[]>(this.baseUrl + '/list').subscribe({
      next: (ids) => {
        this.likeIds.set(ids);
      },
    });
  }

  clearLikeIds() {
    this.likeIds.set([]);
  }
}

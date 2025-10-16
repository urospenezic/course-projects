import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

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

  getLikes(predicate: string) {
    return this.http.get<string[]>(this.baseUrl + '?predicate=' + predicate);
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

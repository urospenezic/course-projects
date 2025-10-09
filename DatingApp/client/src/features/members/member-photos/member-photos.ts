import { Component, inject } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../../types/photo';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos {
  private readonly memberService = inject(MemberService);
  private readonly route = inject(ActivatedRoute);

  protected photos$: Observable<Photo[]> | undefined;

  constructor() {
    const id = this.route.parent?.snapshot.paramMap.get('id');
    if (id) {
      this.photos$ = this.memberService.getMemberPhotos(id);
    }
  }

  get photoMocks() {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      url: `/user.png`,
    }));
  }
}

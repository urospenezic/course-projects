import { Component, inject, OnInit, signal } from '@angular/core';
import { LikesService } from '../../core/services/likes-service';
import { Member } from '../../types/member';
import { MemberCard } from '../members/member-card/member-card';
import { PaginatedResult } from '../../types/pagination';
import { Paginator } from '../../shared/paginator/paginator';

@Component({
  selector: 'app-lists',
  imports: [MemberCard, Paginator],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
})
export class Lists implements OnInit {
  private readonly likesService = inject(LikesService);
  protected paginatedResult = signal<PaginatedResult<Member> | null>(null);
  protected predicate = signal<string>('liked');
  protected pageNumber = signal<number>(1);
  protected pageSize = signal<number>(5);

  tabs = [
    { label: 'Liked', value: 'liked' },
    { label: 'Liked By', value: 'likedBy' },
    { label: 'Mutual Likes', value: 'mutual' },
  ];

  ngOnInit() {
    this.loadLikedMembers();
  }

  setPredicate(value: string) {
    if (this.predicate() === value) return;

    this.predicate.set(value);
    this.pageNumber.set(1);
    this.loadLikedMembers();
  }

  private loadLikedMembers() {
    this.likesService
      .getLikes(this.predicate(), this.pageNumber(), this.pageSize())
      .subscribe((members) => {
        this.paginatedResult.set(members);
      });
  }

  pageChanged(event: { pageNumber: number; pageSize: number }) {
    this.pageSize.set(event.pageSize);
    this.pageNumber.set(event.pageNumber);
    this.loadLikedMembers();
  }
}

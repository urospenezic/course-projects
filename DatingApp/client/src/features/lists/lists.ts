import { Component, inject, OnInit, signal } from '@angular/core';
import { LikesService } from '../../core/services/likes-service';
import { Member } from '../../types/member';
import { MemberCard } from '../members/member-card/member-card';

@Component({
  selector: 'app-lists',
  imports: [MemberCard],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
})
export class Lists implements OnInit {
  private readonly likesService = inject(LikesService);
  protected members = signal<Member[]>([]);
  protected predicate = signal<string>('liked');

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
    this.loadLikedMembers();
  }

  private loadLikedMembers() {
    this.likesService.getLikes(this.predicate()).subscribe((members) => {
      this.members.set(members);
    });
  }
}

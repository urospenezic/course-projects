import { Component, computed, inject, input } from '@angular/core';
import { Member } from '../../../types/member';
import { RouterLink } from '@angular/router';
import { AgePipe } from '../../../core/pipes/age-pipe';
import { LikesService } from '../../../core/services/likes-service';
import { HoverButton } from '../../../shared/hover-button/hover-button';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink, AgePipe, HoverButton],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css',
})
export class MemberCard {
  private readonly likeService = inject(LikesService);
  member = input.required<Member>();

  protected hasLiked = computed(() => {
    return this.likeService.likeIds().includes(this.member().id);
  });

  toggleLike($event: Event) {
    $event.stopPropagation();
    this.likeService.toggleLike(this.member().id).subscribe({
      next: () => {
        if (this.hasLiked()) {
          this.likeService.likeIds.update((ids) => ids.filter((id) => id !== this.member().id));
        } else {
          this.likeService.likeIds.update((ids) => [...ids, this.member().id]);
        }
      },
    });
  }
}

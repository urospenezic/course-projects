import { Component, inject, OnInit, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter, Observable } from 'rxjs';
import { Member } from '../../../types/member';
import { AgePipe } from '../../../core/pipes/age-pipe';

@Component({
  selector: 'app-member-detail',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css',
})
export class MemberDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected title = signal<string>('Profile');

  protected member = signal<Member | null>(null);

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.member.set(data['member']);
      },
    });
    this.title.set(this.route.firstChild?.snapshot.title || 'Profile');

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.title.set(this.route.firstChild?.snapshot.title || 'Profile');
    });
  }

  // loadMember() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) {
  //     return this.memberService.getMember(id);
  //   }
  //   return;
  // }
}

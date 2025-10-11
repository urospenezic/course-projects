import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
import { AccountService } from '../../../core/services/account-service';
import { MemberService } from '../../../core/services/member-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-member-detail',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css',
})
export class MemberDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private accountService = inject(AccountService);
  protected memberService = inject(MemberService);
  private router = inject(Router);
  protected title = signal<string>('Profile');
  protected isCurrtentUser = computed(() => {
    const currentUser = this.accountService.currentUser();
    return currentUser && currentUser.id === this.route.snapshot.paramMap.get('id');
  });

  goBack() {
    // Clear the current member data and navigate back to members list
    this.memberService.member.set(null);
    this.router.navigate(['/members']);
  }

  ngOnInit(): void {
    // Subscribe to resolver data to get the member
    this.route.data.subscribe({
      next: (data) => {
        this.memberService.member.set(data['member']);
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

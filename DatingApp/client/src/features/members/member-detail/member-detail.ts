import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../../../core/services/member-service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Member } from '../../../types/member';

@Component({
  selector: 'app-member-detail',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css',
})
export class MemberDetail implements OnInit {
  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);

  protected member$?: Observable<Member>;

  ngOnInit(): void {
    this.member$ = this.loadMember();
  }

  loadMember() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      return this.memberService.getMember(id);
    }
    return;
  }
}

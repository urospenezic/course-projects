import {
  Component,
  computed,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, FormsModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm?: NgForm;
  private readonly route = inject(ActivatedRoute);
  protected memberService = inject(MemberService);
  private readonly accountService = inject(AccountService);
  private readonly toastService = inject(ToastService);

  @HostListener('window:beforeunload', ['$event']) notify($event: BeforeUnloadEvent) {
    if (this.editForm?.dirty) {
      $event.preventDefault();
    }
  }

  protected editableMember = computed<EditableMember>(() => {
    if (this.memberService.member()) {
      const member = this.memberService.member();
      return {
        displayName: member?.displayName || '',
        city: member?.city || '',
        country: member?.country || '',
        description: member?.description || '',
      };
    }
    return { displayName: '', city: '', country: '', description: '' };
  });

  ngOnInit(): void {
    // this.route.parent?.data.subscribe({
    //   next: (data) => {
    //     this.member.set(data['member']);
    //   },
    // });
  }
  ngOnDestroy(): void {
    this.memberService.editMode.set(false);
  }

  updateMember() {
    if (!this.memberService.member()) {
      return;
    }

    var updatedMember = { ...this.memberService.member(), ...this.editableMember() };

    this.memberService.updateMember(this.editableMember()).subscribe({
      next: () => {
        this.toastService.success('Profile updated successfully');
        this.memberService.editMode.set(false);
        this.editForm?.reset(updatedMember);
        this.memberService.member.set(updatedMember as Member);
        const currentUser = this.accountService.currentUser();
        if (currentUser && currentUser.displayName !== updatedMember.displayName) {
          this.accountService.setCurrentUser({
            ...currentUser,
            displayName: updatedMember.displayName,
          });
        }
      },
    });
  }
}

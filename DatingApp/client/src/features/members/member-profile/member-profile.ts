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
  private readonly toastService = inject(ToastService);

  @HostListener('window:beforeunload', ['$event']) notify($event: BeforeUnloadEvent) {
    if (this.editForm?.dirty) {
      $event.preventDefault();
    }
  }

  protected member = signal<Member | undefined>(undefined);
  protected editableMember = computed<EditableMember>(() => {
    if (this.member()) {
      return {
        displayName: this.member()?.displayName || '',
        city: this.member()?.city || '',
        country: this.member()?.country || '',
        description: this.member()?.description || '',
      };
    }
    return { displayName: '', city: '', country: '', description: '' };
  });

  ngOnInit(): void {
    this.route.parent?.data.subscribe({
      next: (data) => {
        this.member.set(data['member']);
      },
    });
  }
  ngOnDestroy(): void {
    this.memberService.editMode.set(false);
  }

  updateMember() {
    if (!this.member()) {
      return;
    }

    var updatedMember = { ...this.member(), ...this.editableMember() };
    this.toastService.success('Profile updated successfully');
    this.memberService.editMode.set(false);
  }
}

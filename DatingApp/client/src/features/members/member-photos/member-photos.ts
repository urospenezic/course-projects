import { Component, inject, input, OnInit, signal, NO_ERRORS_SCHEMA } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../../types/photo';
import { AsyncPipe } from '@angular/common';
import { ImageUpload } from '../../../shared/image-upload/image-upload';
import { AccountService } from '../../../core/services/account-service';
import { Member } from '../../../types/member';
import { HoverButton } from '../../../shared/hover-button/hover-button';

@Component({
  selector: 'app-member-photos',
  imports: [ImageUpload, HoverButton],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos implements OnInit {
  protected readonly memberService = inject(MemberService);
  private readonly accountService = inject(AccountService);
  private readonly route = inject(ActivatedRoute);
  protected loading = signal<boolean>(false);
  protected photos = signal<Photo[]>([]);

  ngOnInit(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');
    if (id) {
      this.memberService.getMemberPhotos(id).subscribe((photos) => this.photos.set(photos));
    }
  }

  get photoMocks() {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      url: `/user.png`,
    }));
  }

  onUpload(file: File) {
    this.loading.set(true);
    this.memberService.uploadPhoto(file).subscribe({
      next: (photo) => {
        this.memberService.editMode.set(false);
        this.photos.update((photos) => [...photos, photo as Photo]);
      },
      error: (err) => {
        console.error('Error uploading photo:', err);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  setMainPhoto(photo: Photo) {
    const photoId = photo.id;
    this.memberService.setMainPhoto(photoId).subscribe({
      next: () => {
        const member = this.memberService.member();
        const currentUser = this.accountService.currentUser();

        if (member && currentUser) {
          const mainPhoto = this.photos().find((p) => p.id === photoId);
          this.memberService.member.update(
            (member) =>
              ({
                ...member,
                imageUrl: mainPhoto?.url || member?.imageUrl,
              } as Member)
          );

          this.accountService.setCurrentUser({
            ...currentUser,
            imageUrl: mainPhoto?.url || currentUser.imageUrl,
          });
        }
      },
      error: (err) => {
        console.error('Error setting main photo:', err);
      },
    });
  }

  deletePhoto(photo: Photo) {
    const photoId = photo.id;
    this.memberService.deletePhoto(photoId).subscribe({
      next: () => {
        this.photos.update((photos) => photos.filter((p) => p.id !== photoId));
      },
      error: (err) => {
        console.error('Error deleting photo:', err);
      },
    });
  }
}

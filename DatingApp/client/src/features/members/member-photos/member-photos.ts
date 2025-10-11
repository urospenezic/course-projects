import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../../types/photo';
import { AsyncPipe } from '@angular/common';
import { ImageUpload } from '../../../shared/image-upload/image-upload';

@Component({
  selector: 'app-member-photos',
  imports: [ImageUpload],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos implements OnInit {
  protected readonly memberService = inject(MemberService);
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
}

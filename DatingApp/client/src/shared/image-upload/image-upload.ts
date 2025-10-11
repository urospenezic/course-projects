import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  imports: [],
  templateUrl: './image-upload.html',
  styleUrl: './image-upload.css',
})
export class ImageUpload {
  protected imageSrc = signal<string | ArrayBuffer | null>(null);
  protected isDragging = signal<boolean>(false);
  private file: File | null = null;
  uploadFile = output<File>();
  loading = input<boolean>(false); //passed from parent to check if a request is in progress

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    if (event.dataTransfer && event.dataTransfer?.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.previewImage(file);
      this.file = file;
      event.dataTransfer.clearData();
    }
  }

  private previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageSrc.set(e.target?.result || null);
    };
    reader.readAsDataURL(file);
  }

  onCancel() {
    this.imageSrc.set(null);
    this.file = null;
  }

  onUpload() {
    if (this.file) {
      this.uploadFile.emit(this.file);
    }
  }
}

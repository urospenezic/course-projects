import { Component, computed, input, model, output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator {
  totalPages = input<number>(0);
  pageNumber = model<number>(1);
  pageSize = model<number>(5);
  totalCount = input<number>(0);
  pageSizeOptions = input<number[]>([5, 10, 20, 50]);

  pageChange = output<{ pageNumber: number; pageSize: number }>();
  lastItemIndex = computed(() => {
    return Math.min(this.pageNumber() * this.pageSize(), this.totalCount());
  });

  onPageChange(newPage?: number, pageSize?: EventTarget | null) {
    if (newPage) this.pageNumber.set(newPage);
    if (pageSize) {
      const size = Number((pageSize as HTMLSelectElement).value);
      this.pageSize.set(size);
    }
    this.pageChange.emit({ pageNumber: this.pageNumber(), pageSize: this.pageSize() });
  }
}

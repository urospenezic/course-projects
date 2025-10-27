import { Component, inject, OnInit, signal } from '@angular/core';
import { MessageService } from '../../core/services/message-service';
import { PaginatedResult } from '../../types/pagination';
import { Message } from '../../types/message';
import { Paginator } from '../../shared/paginator/paginator';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-messages',
  imports: [Paginator, DatePipe, RouterLink],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages implements OnInit {
  private readonly messageService = inject(MessageService);
  protected container = signal<string>('Inbox');
  protected fetchedContainer = signal<string>('Inbox');
  protected messages = signal<PaginatedResult<Message> | null>(null);
  protected pageNumber = signal<number>(1);
  protected pageSize = signal<number>(10);

  tabs = [
    { label: 'Inbox', value: 'Inbox' },
    { label: 'Outbox', value: 'Outbox' },
  ];

  ngOnInit() {
    this.loadMessages();
  }

  private loadMessages() {
    this.messageService
      .getMessages(this.container(), this.pageNumber(), this.pageSize())
      .subscribe({
        next: (messages) => {
          this.fetchedContainer.set(this.container());
          this.messages.set(messages);
        },
        error: (error) => console.error(error),
      });
  }

  deleteMessage(event: Event, id: string) {
    event.stopPropagation();
    this.messageService.deleteMessage(id).subscribe({
      next: () => {
        const current = this.messages();
        if (current?.items) {
          this.messages.update((prev) => {
            if (!prev || !prev.metadata) return null;
            const newItems = prev.items?.filter((x) => x.id !== id) || [];
            const newMetadata = {
              ...prev.metadata,
              totalCount: prev.metadata.totalCount - 1,
              totalPages: Math.max(
                1,
                Math.ceil((prev.metadata.totalCount - 1) / prev.metadata.pageSize)
              ),
              currentPage: Math.min(
                prev.metadata.currentPage,
                Math.max(1, Math.ceil((prev.metadata.totalCount - 1) / prev.metadata.pageSize))
              ),
            };
            return {
              items: newItems,
              metadata: newMetadata,
            };
          });
        }
      },
    });
  }

  get isInbox(): boolean {
    return this.fetchedContainer() === 'Inbox';
  }

  setContainer(container: string) {
    this.container.set(container);
    this.pageNumber.set(1);
    this.loadMessages();
  }

  pageChanged(event: { pageNumber: number; pageSize: number }) {
    this.pageSize.set(event.pageSize);
    this.pageNumber.set(event.pageNumber);
    this.loadMessages();
  }
}

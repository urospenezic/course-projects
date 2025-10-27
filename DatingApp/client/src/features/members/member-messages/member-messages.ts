import { Component, effect, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { MessageService } from '../../../core/services/message-service';
import { Message } from '../../../types/message';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../../../core/pipes/time-ago-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  imports: [DatePipe, TimeAgoPipe, FormsModule],
  templateUrl: './member-messages.html',
  styleUrl: './member-messages.css',
})
export class MemberMessages implements OnInit {
  @ViewChild('messageEndRef') messageEndRef!: ElementRef;
  private readonly memberService = inject(MemberService);
  private readonly messagesService = inject(MessageService);
  protected messageContent = '';
  protected messages = signal<Message[]>([]);

  constructor() {
    effect(() => {
      const currentMessages = this.messages();
      if (currentMessages.length > 0) {
        this.scrollToBottom();
      }
    });
  }

  ngOnInit() {
    this.loadMessages();
  }

  private loadMessages() {
    const id = this.memberService.member()?.id;
    if (id) {
      this.messagesService.getMessageThread(id).subscribe({
        next: (messages) =>
          this.messages.set(
            messages.map((message) => {
              return {
                ...message,
                currentUserSender: message.senderId !== id,
              };
            })
          ),
        error: (error) => console.error('Error loading messages:', error),
      });
    }
  }

  sendMessage() {
    const memberId = this.memberService.member()?.id;
    if (memberId && this.messageContent.trim()) {
      this.messagesService.sendMessage(memberId, this.messageContent).subscribe({
        next: (message) => {
          this.messages.update((msgs) => [...msgs, { ...message, currentUserSender: true }]);
          this.messageContent = '';
        },
        error: (error) => console.error('Error sending message:', error),
      });
    }
  }

  scrollToBottom() {
    //set timeout to ensure that the current js call stack is cleared before scrolling
    setTimeout(() => {
      try {
        if (this.messageEndRef) {
          this.messageEndRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (err) {
        console.error('Scroll to bottom failed:', err);
      }
    });
  }
}

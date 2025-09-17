import { Component, input, output, signal } from '@angular/core';
import { Ticket } from './ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  ticket = input.required<Ticket>();
  detailsVisible = signal(false);
  statusUpdated = output<{ticketId: number, status: 'open' | 'closed'}>();
  onToggleDetails() {
    this.detailsVisible.update((visible) => !visible);
  }

  onMarkAsCompleted() {
    this.statusUpdated.emit({ticketId: this.ticket().id, status: 'closed'});
  }
}

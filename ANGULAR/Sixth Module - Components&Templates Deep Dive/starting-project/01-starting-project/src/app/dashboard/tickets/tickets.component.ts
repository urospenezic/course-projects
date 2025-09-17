import { Component, signal, computed } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { Ticket } from './ticket/ticket.model';
import { TicketComponent } from './ticket/ticket.component';
@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
//CHECK FOR @EMPTY IN TICKET COMPONENT
//ALSO READ THE DOCUMENTATION FOR @FOR SUB STUFF, LIKE $COUNT, $FIRST ETC
export class TicketsComponent {
  onKeyDown($event: Event) {
    if ($event instanceof KeyboardEvent) {
      if ($event?.key === 'Enter' && $event?.shiftKey) {
        this.onTicketCreated({
          title: 'New Ticket',
          description: 'New Ticket Description',
        });
      }
    }
  }
  tickets = signal<Ticket[]>([]);
  openTickets = computed(() =>
    this.tickets().filter((ticket) => ticket.status === 'open')
  );
  closedTickets = computed(() =>
    this.tickets().filter((ticket) => ticket.status === 'closed')
  );
  totalTickets = computed(() => this.tickets().length);

  onTicketCreated(ticket: { title: string; description: string }) {
    this.tickets.update((tickets) => [
      ...tickets,
      {
        id: Math.random(),
        title: ticket.title,
        description: ticket.description,
        status: 'open',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }

  updateTicketStatus({ticketId, status}: {ticketId: number, status: 'open' | 'closed'}  ) {
    this.tickets.update((tickets) =>
      tickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status } : ticket
      )
    );
  }
}

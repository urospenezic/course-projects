export interface Message {
  id: string;
  content: string;
  dateRead?: string;
  senderId: string;
  recipientId: string;
  senderDisplayName: string;
  recipientDisplayName: string;
  senderImageUrl: string;
  recipientImageUrl: string;
  messageSent: string;
  currentUserSender?: boolean;
}

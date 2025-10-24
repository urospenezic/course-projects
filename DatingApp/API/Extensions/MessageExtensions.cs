using System;
using System.Linq.Expressions;
using API.DTOs;
using API.Entities;

namespace API.Extensions;

public static class MessageExtensions
{
    public static MessageDto ToDto(this Message message)
    {
        return new MessageDto
        {
            Id = message.Id,
            Content = message.Content,
            DateRead = message.DateRead,
            SenderId = message.SenderId,
            RecipientId = message.RecipientId,
            SenderDisplayName = message.Sender.DisplayName,
            RecipientDisplayName = message.Recipient.DisplayName,
            SenderImageUrl = message.Sender.ImageUrl,
            RecipientImageUrl = message.Recipient.ImageUrl,
            MessageSent = message.MessageSent,
        };
    }

    public static Expression<Func<Message, MessageDto>> AsMessageDto =>
        message => new MessageDto
        {
            Id = message.Id,
            Content = message.Content,
            DateRead = message.DateRead,
            SenderId = message.SenderId,
            RecipientId = message.RecipientId,
            SenderDisplayName = message.Sender.DisplayName,
            RecipientDisplayName = message.Recipient.DisplayName,
            SenderImageUrl = message.Sender.ImageUrl,
            RecipientImageUrl = message.Recipient.ImageUrl,
            MessageSent = message.MessageSent,
        };
}

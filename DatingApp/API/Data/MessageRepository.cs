using System;
using System.Runtime;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class MessageRepository(AppDbContext context) : IMessageRepository
{
    public void AddMessage(Message message)
    {
        context.Messages.AddAsync(message);
    }

    public void DeleteMessage(Message message)
    {
        context.Messages.Remove(message);
    }

    public async Task<Message?> GetMessageAsync(string messageId)
    {
        return await context.Messages.FindAsync(messageId);
    }

    public async Task<PaginatedResult<MessageDto>> GetMessagesForMemberAsync(
        MessageParams messageParams
    )
    {
        var query = context.Messages.OrderByDescending(m => m.MessageSent).AsQueryable();

        query = messageParams.Container switch
        {
            "Inbox" => query.Where(m => m.RecipientId == messageParams.MemberId),
            "Outbox" => query.Where(m => m.SenderId == messageParams.MemberId),
            _ => query.Where(m => m.RecipientId == messageParams.MemberId && m.DateRead == null),
        };

        var messages = query.Select(MessageExtensions.AsMessageDto);

        return await PaginationHelper.CreateAsync(
            messages,
            messageParams.PageNumber,
            messageParams.PageSize
        );
    }

    public async Task<IReadOnlyList<MessageDto>> GetMessageThreadAsync(
        string currentMemberId,
        string recipientMemberId
    )
    {
        await context
            .Messages.Where(x =>
                x.RecipientId == currentMemberId
                && x.DateRead == null
                && x.SenderId == recipientMemberId
            )
            .ExecuteUpdateAsync(setters => setters.SetProperty(m => m.DateRead, DateTime.UtcNow));

        return await context
            .Messages.Where(m =>
                (m.RecipientId == currentMemberId && m.SenderId == recipientMemberId)
                || (m.RecipientId == recipientMemberId && m.SenderId == currentMemberId)
            )
            .OrderBy(m => m.MessageSent)
            .Select(MessageExtensions.AsMessageDto)
            .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}

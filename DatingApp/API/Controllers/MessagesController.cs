using System;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class MessagesController(
    IMessageRepository messageRepository,
    IMemberRepository memberRepository
) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
    {
        var sender = await memberRepository.GetMemberByIdAsync(User.GetMemberId());
        var recipient = await memberRepository.GetMemberByIdAsync(createMessageDto.RecipientId);

        if (recipient == null || sender == null || sender.Id == createMessageDto.RecipientId)
            return BadRequest("Could not find receipient or sender");

        var message = new Message
        {
            SenderId = sender.Id,
            RecipientId = recipient.Id,
            Content = createMessageDto.Content,
        };

        messageRepository.AddMessage(message);

        if (await messageRepository.SaveAllAsync())
            return Ok(message.ToDto());

        return BadRequest("Failed to send message");
    }

    [HttpGet]
    public async Task<ActionResult<PaginatedResult<MessageDto>>> GetMessagesForMember(
        [FromQuery] MessageParams messageParams
    )
    {
        messageParams.MemberId = User.GetMemberId();

        var messages = await messageRepository.GetMessagesForMemberAsync(messageParams);

        return Ok(messages);
    }

    [HttpGet("thread/{recipientId}")]
    public async Task<ActionResult<IReadOnlyList<MessageDto>>> GetMessageThread(string recipientId)
    {
        var currentMemberId = User.GetMemberId();

        var messages = await messageRepository.GetMessageThreadAsync(currentMemberId, recipientId);

        return Ok(messages);
    }
}

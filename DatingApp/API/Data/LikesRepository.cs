using System;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class LikesRepository(AppDbContext context) : ILikesRepository
{
    public async void AddLike(MemberLike like)
    {
        await context.Likes.AddAsync(like);
    }

    public void DeleteLike(MemberLike like)
    {
        context.Likes.Remove(like);
    }

    public async Task<IReadOnlyList<string>> GetCurrentMemberLikeIds(string memberId)
    {
        return await context
            .Likes.Where(l => l.SourceMemberId == memberId)
            .Select(l => l.TargetMemberId)
            .ToListAsync();
    }

    public async Task<MemberLike?> GetMemberLike(string sourceMemberId, string targetMemberId)
    {
        return await context.Likes.FindAsync(sourceMemberId, targetMemberId);
    }

    public async Task<IReadOnlyList<Member>> GetMemberLikes(string predicate, string memberId)
    {
        var query = context.Likes.AsQueryable();
        switch (predicate)
        {
            case "liked":
                return await query
                    .Where(l => l.SourceMemberId == memberId)
                    .Select(l => l.TargetMember)
                    .ToListAsync();
            case "likedBy":
                return await query
                    .Where(l => l.TargetMemberId == memberId)
                    .Select(l => l.SourceMember)
                    .ToListAsync();
            default:
                var likeIds = await GetCurrentMemberLikeIds(memberId);
                return await query
                    .Where(m => m.TargetMemberId == memberId && likeIds.Contains(m.SourceMemberId))
                    .Select(l => l.SourceMember)
                    .ToListAsync();
        }
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}

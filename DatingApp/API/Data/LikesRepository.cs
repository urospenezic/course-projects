using System;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
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

    public async Task<MemberLike?> GetMemberLike(string memberId, string targetMemberId)
    {
        return await context.Likes.FindAsync(memberId, targetMemberId);
    }

    public async Task<PaginatedResult<Member>> GetMemberLikes(LikesParams likesParams)
    {
        var memberId = likesParams.MemberId;
        var predicate = likesParams.Predicate;
        var query = context.Likes.AsQueryable();
        IQueryable<Member> result;
        switch (predicate)
        {
            case "liked":
                result = query.Where(l => l.SourceMemberId == memberId).Select(l => l.TargetMember);
                break;
            case "likedBy":
                result = query.Where(l => l.TargetMemberId == memberId).Select(l => l.SourceMember);
                break;
            default:
                var likeIds = await GetCurrentMemberLikeIds(memberId);
                result = query
                    .Where(m => m.TargetMemberId == memberId && likeIds.Contains(m.SourceMemberId))
                    .Select(l => l.SourceMember);
                break;
        }

        return await PaginationHelper.CreateAsync(
            result,
            likesParams.PageNumber,
            likesParams.PageSize
        );
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}

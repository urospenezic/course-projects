using System;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class MemberRepository(AppDbContext context) : IMemberRepository
{
    private readonly AppDbContext _context = context;

    public void Update(Member user)
    {
        _context.Entry(user).State = EntityState.Modified;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<PaginatedResult<Member>> GetMembersAsync(MemberParams memberParams)
    {
        var query = _context.Members.AsQueryable();

        if (!string.IsNullOrEmpty(memberParams.CurrentMemberId))
        {
            query = query.Where(m => m.Id != memberParams.CurrentMemberId);
        }

        if (!string.IsNullOrEmpty(memberParams.Gender))
        {
            query = query.Where(m => m.Gender == memberParams.Gender);
        }

        query = memberParams.OrderBy switch
        {
            "created" => query.OrderByDescending(m => m.Created),
            _ => query.OrderByDescending(m => m.LastActive),
        };

        var minDob = DateOnly.FromDateTime(DateTime.Today).AddYears(-memberParams.MaxAge - 1);
        var maxDob = DateOnly.FromDateTime(DateTime.Today).AddYears(-memberParams.MinAge);
        query = query.Where(m => m.DateOfBirth >= minDob && m.DateOfBirth <= maxDob);

        return await PaginationHelper.CreateAsync(
            query,
            memberParams.PageNumber,
            memberParams.PageSize
        );
    }

    public async Task<Member?> GetMemberByIdAsync(string id)
    {
        return await _context.Members.FindAsync(id);
    }

    public async Task<IEnumerable<Photo>> GetPhotosByMemberIdAsync(string memberId)
    {
        return await _context
            .Members.Where(m => m.Id == memberId)
            .SelectMany(m => m.Photos)
            .ToListAsync();
    }

    public async Task<Member?> GetMemberByIdForUpdateAsync(string id)
    {
        return await _context
            .Members.Include(member => member.AppUser)
            .Include(member => member.Photos)
            .SingleOrDefaultAsync(member => member.Id == id);
    }
}

using System;
using API.Entities;
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

    public async Task<IEnumerable<Member>> GetMembersAsync()
    {
        return await _context.Members.ToListAsync();
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
}

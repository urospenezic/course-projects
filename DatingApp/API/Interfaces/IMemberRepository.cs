using System;
using API.Entities;

namespace API.Interfaces;

public interface IMemberRepository
{
    void Update(Member user);

    Task<bool> SaveAllAsync();

    Task<IEnumerable<Member>> GetMembersAsync();

    Task<Member?> GetMemberByIdAsync(string id);

    Task<IEnumerable<Photo>> GetPhotosByMemberIdAsync(string memberId);

    Task<Member?> GetMemberByIdForUpdateAsync(string id);
}

using System;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface IMemberRepository
{
    void Update(Member user);

    Task<bool> SaveAllAsync();

    Task<PaginatedResult<Member>> GetMembersAsync(MemberParams pagingParams);

    Task<Member?> GetMemberByIdAsync(string id);

    Task<IEnumerable<Photo>> GetPhotosByMemberIdAsync(string memberId);

    Task<Member?> GetMemberByIdForUpdateAsync(string id);
}

using System;

namespace API.Entities;

//Join entity for many-to-many relationship between Member and Member (self-referencing)
// public List<MemberLike> LikedByMembers { get; set; } = [];
// public List<MemberLike> LikedMembers { get; set; } = [];
public class MemberLike
{
    public required string SourceMemberId { get; set; }
    public Member SourceMember { get; set; } = null!;
    public required string TargetMemberId { get; set; }
    public Member TargetMember { get; set; } = null!;
}

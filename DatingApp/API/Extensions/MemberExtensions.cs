using System;
using API.Entities;

namespace API.Extensions;

public static class MemberExtensions
{
    public static bool IsMainPhoto(this Member member, Photo photo)
    {
        if (member == null || photo == null)
            return false;

        return photo.Url == member.ImageUrl;
    }
}

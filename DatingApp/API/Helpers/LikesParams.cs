using System;

namespace API.Helpers;

public class LikesParams
{
    public string MemberId { get; set; } = string.Empty;
    public string Predicate { get; set; } = "liked";

    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}

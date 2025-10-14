using System;

namespace API.Helpers;

public class PagingParams
{
    private const int _maxPageSize = 50;

    public int PageNumber { get; set; } = 1;

    private int _pageSize = 10;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = Math.Min(value, _maxPageSize);
    }
}

using System;
using System.Text.Json.Serialization;

namespace API.Entities;

public class Photo
{
    public int Id { get; set; }
    public string PublicId { get; set; } = null!;
    public required string Url { get; set; }

    //Nav property
    [JsonIgnore]
    public Member Member { get; set; } = null!;
    public string MemberId { get; set; } = null!;
}

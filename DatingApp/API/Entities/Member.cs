using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Entities;

public class Member
{
    //Reason why we're keeping some same properties between AppUser and Member is so that we do not have
    //to do a join query to get the data we need for members list
    //Also, Member is not used for authentication, only for displaying data
    public string Id { get; set; } = null!;
    public DateOnly DateOfBirth { get; set; }
    public string? ImageUrl { get; set; }
    public required string DisplayName { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public required string Gender { get; set; }
    public string? Description { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }

    //Nav property
    [ForeignKey(nameof(Id))]
    [JsonIgnore]
    public AppUser AppUser { get; set; } = null!;

    [JsonIgnore]
    public List<Photo> Photos { get; set; } = [];
}

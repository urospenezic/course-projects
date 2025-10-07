using System;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(AppDbContext context)
    {
        if (await context.Users.AnyAsync())
            return;

        var memberData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var options = new System.Text.Json.JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
        };
        var members = System.Text.Json.JsonSerializer.Deserialize<List<SeedUserDto>>(
            memberData,
            options
        );

        if (members == null)
            return;
        foreach (var member in members)
        {
            using var hmac = new System.Security.Cryptography.HMACSHA512();
            var appUser = new AppUser
            {
                Id = member.Id,
                DisplayName = member.DisplayName,
                Email = member.Email,
                ImageUrl = member.ImageUrl,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("Pa$$w0rd")),
                PasswordSalt = hmac.Key,
                Member = new Member
                {
                    Id = member.Id,
                    DateOfBirth = member.DateOfBirth,
                    ImageUrl = member.ImageUrl,
                    DisplayName = member.DisplayName,
                    Created = member.Created,
                    Gender = member.Gender,
                    Description = member.Description,
                    City = member.City,
                    Country = member.Country,
                    LastActive = member.LastActive,
                },
            };

            appUser.Member.Photos.Add(
                new Photo
                {
                    Url = member.ImageUrl!,
                    MemberId = member.Id,
                    PublicId = "seed-photo",
                }
            );

            context.Users.Add(appUser);
        }

        await context.SaveChangesAsync();
    }
}

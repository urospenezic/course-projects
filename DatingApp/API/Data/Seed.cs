using System;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(UserManager<AppUser> userManager)
    {
        if (await userManager.Users.AnyAsync())
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
            var appUser = new AppUser
            {
                Id = member.Id,
                DisplayName = member.DisplayName,
                Email = member.Email,
                ImageUrl = member.ImageUrl,
                UserName = member.Email,
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

            var result = await userManager.CreateAsync(appUser, "Pa$$w0rd");

            if (!result.Succeeded)
            {
                Console.WriteLine(result.Errors.First().Description);
            }

            await userManager.AddToRoleAsync(appUser, "Member");
        }

        var admin = new AppUser
        {
            DisplayName = "Admin",
            Email = "admin@example.com",
            UserName = "admin@example.com",
        };

        await userManager.CreateAsync(admin, "Pa$$w0rd");
        await userManager.AddToRolesAsync(admin, ["Admin", "Moderator"]);
    }
}

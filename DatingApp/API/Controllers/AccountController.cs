using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var email = loginDto.Email.ToLower();
        var password = loginDto.Password;

        var user = await context.Users.SingleOrDefaultAsync(x =>
            x.Email.ToLower() == email.ToLower()
        );
        if (user is null)
        {
            return Unauthorized("Invalid email");
        }

        var hmac = new System.Security.Cryptography.HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i])
            {
                return Unauthorized("Invalid password");
            }
        }

        hmac.Dispose();
        return Ok(user.ToDto(tokenService));
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        var displayName = registerDto.DisplayName;
        var email = registerDto.Email.ToLower();
        var password = registerDto.Password;

        if (await EmailExists(email))
        {
            return BadRequest("Email is already taken");
        }

        var hmac = new System.Security.Cryptography.HMACSHA512();
        var user = new AppUser
        {
            Email = email,
            DisplayName = displayName,
            PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)),
            PasswordSalt = hmac.Key,
            Member = new Member()
            {
                Gender = registerDto.Gender,
                City = registerDto.City,
                Country = registerDto.Country,
                DisplayName = displayName,
                DateOfBirth = registerDto.DateOfBirth,
            },
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        hmac.Dispose();
        return Ok(user.ToDto(tokenService));
    }

    private async Task<bool> EmailExists(string email)
    {
        return await context.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower());
    }
}

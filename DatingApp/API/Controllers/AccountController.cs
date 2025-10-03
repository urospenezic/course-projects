using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context) : BaseApiController
{
    private readonly AppDbContext _context = context;

    [HttpPost("login")]
    public async Task<ActionResult<AppUser>> Login(LoginDto loginDto)
    {
        var email = loginDto.Email.ToLower();
        var password = loginDto.Password;

        var user = await _context.Users.SingleOrDefaultAsync(x =>
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
        return Ok(user);
    }

    [HttpPost("register")]
    public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
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
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        hmac.Dispose();
        return Ok(user);
    }

    private async Task<bool> EmailExists(string email)
    {
        return await _context.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower());
    }
}

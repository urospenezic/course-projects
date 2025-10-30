using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(UserManager<AppUser> userManager, ITokenService tokenService)
    : BaseApiController
{
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var email = loginDto.Email.ToLower();
        var password = loginDto.Password;

        var user = await userManager.FindByEmailAsync(email);
        if (user is null)
        {
            return Unauthorized("Invalid email");
        }

        var result = await userManager.CheckPasswordAsync(user, password);
        if (!result)
        {
            return Unauthorized("Invalid password");
        }

        return Ok(await user.ToDto(tokenService));
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        var displayName = registerDto.DisplayName;
        var email = registerDto.Email.ToLower();
        var password = registerDto.Password;
        var user = new AppUser
        {
            Email = email,
            DisplayName = displayName,
            UserName = registerDto.Email,
            Member = new Member()
            {
                Gender = registerDto.Gender,
                City = registerDto.City,
                Country = registerDto.Country,
                DisplayName = displayName,
                DateOfBirth = registerDto.DateOfBirth,
            },
        };

        var result = await userManager.CreateAsync(user, password);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("identity", error.Description);
            }
            return ValidationProblem(ModelState);
        }

        await userManager.AddToRoleAsync(user, "Member");

        return Ok(await user.ToDto(tokenService));
    }
}

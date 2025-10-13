using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    public required string DisplayName { get; set; }

    [Required, EmailAddress]
    public required string Email { get; set; }

    [Required, MinLength(8)]
    public required string Password { get; set; }

    [Required]
    public string Gender { get; set; } = string.Empty;

    [Required]
    public string City { get; set; } = string.Empty;

    [Required]
    public string Country { get; set; } = string.Empty;

    [Required]
    public DateOnly DateOfBirth { get; set; }
}

using System.ComponentModel.DataAnnotations;

namespace Vaerenberg.Models;

public class ContactRequest
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = null!;

    [Required]
    [EmailAddress]
    [StringLength(100)]
    public string Email { get; set; } = null!;

    [Required]
    [StringLength(500)]
    public string Message { get; set; } = null!;
}
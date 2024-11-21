using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Vaerenberg.Filters;
using Vaerenberg.Models;
using Vaerenberg.Services;

namespace Vaerenberg.Controllers;

[Route("api/[controller]")]
public class ContactController(IEmailService emailService) : Controller
{
    [HttpPost]
    [ValidateModelState]
    public async Task<IActionResult> Post(ContactRequest request)
    {
        await
            emailService.Send("bart@vaerenberg.com", "Message from vaerenberg.com",
                JsonSerializer.Serialize(request));

        return Ok();
    }
}

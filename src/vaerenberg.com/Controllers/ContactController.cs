using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using vaerenberg.com.Services;
using Vaerenberg.Filters;
using Vaerenberg.Models;
using Vaerenberg.Services;

namespace Vaerenberg.Controllers;

[Route("api/[controller]")]
public class ContactController(IEmailService emailService, IRecaptchaService recaptchaService) : Controller
{
    [HttpPost]
    [ValidateModelState]
    public async Task<IActionResult> Post(ContactRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.RecaptchaToken))
            return BadRequest("Missing reCAPTCHA token");

        var isHuman = await recaptchaService.Validate(request.RecaptchaToken);
        if (!isHuman)
            return BadRequest("reCAPTCHA validation failed");

        await
            emailService.Send("bart@vaerenberg.com", "Message from vaerenberg.com",
                JsonSerializer.Serialize(new {
                    request.Name, request.Email, request.Message
                }));

        return Ok();
    }
}
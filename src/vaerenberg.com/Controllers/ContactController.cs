using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Vaerenberg.Filters;
using Vaerenberg.Models;
using Vaerenberg.Services;

namespace Vaerenberg.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly IEmailService _emailService;

        public ContactController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost]
        [ValidateModelState]
        public async Task<IActionResult> Post(ContactRequest request)
        {
            await
                _emailService.Send("bart@vaerenberg.com", "Message from vaerenberg.com",
                    JsonConvert.SerializeObject(request));

            return Ok();
        }
    }
}

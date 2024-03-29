using Microsoft.AspNetCore.Mvc;

namespace Vaerenberg.Controllers;

[Route("[controller]")]
public class ResearchController : Controller
{
    // GET: /<controller>/
    public IActionResult Index()
    {
        return Redirect("https://www.researchgate.net/profile/Bart_Vaerenberg");
    }
}

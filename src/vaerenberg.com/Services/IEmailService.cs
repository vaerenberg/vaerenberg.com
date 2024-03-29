using System.Threading.Tasks;

namespace Vaerenberg.Services;

public interface IEmailService
{
    Task Send(string recipient, string subject, string body);
}
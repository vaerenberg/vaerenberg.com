using Vaerenberg.Services;
using Azure.Communication.Email;
using Azure;
using Microsoft.Extensions.Options;

namespace Vaerenberg;

public class AzureEmail(EmailClient emailClient, IOptions<AppSettings> settings, ILogger<AzureEmail> logger) : IEmailService
{
    public async Task Send(string recipient, string subject, string body)
    {
        var message = new EmailMessage(
           settings.Value.Email.FromEmail,
           recipient,
           new EmailContent(subject)
           {
               PlainText = body
           });
   
        var response = await emailClient.SendAsync(WaitUntil.Started, message);

        logger.LogInformation("Email sent: id={id}, completed={completed} status={status} ",
            response.Id, response.HasCompleted, response.HasValue ? response.Value.Status : "(none)");
    }
}

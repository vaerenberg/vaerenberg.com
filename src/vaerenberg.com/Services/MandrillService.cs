using System.Collections.Generic;
using System.Configuration;
using System.Threading.Tasks;
using Mandrill;
using Mandrill.Models;
using Mandrill.Requests.Messages;
using Microsoft.Extensions.OptionsModel;

namespace Vaerenberg.Services
{
    public class MandrillService : IEmailService
    {
        private readonly MandrillOptions _options;
        private readonly IMandrillApi _api;

        public MandrillService(IOptions<AppSettings> settings)
        {
            _options = settings.Value.Mandrill;

            if (string.IsNullOrEmpty(_options.ApiKey))
            {
                throw new ConfigurationErrorsException("A Mandrill API key needs to be configured.");
            }

            _api = new MandrillApi(_options.ApiKey);
        }

        public async Task Send(string recipient, string subject, string body)
        {
            var mandrillMessage = new EmailMessage
            {
                FromEmail = _options.FromEmail,
                To = new List<EmailAddress>(new[] { new EmailAddress(recipient) }),
                Subject = subject,
                Html = body
            };

            var request = new SendMessageRequest(mandrillMessage);

            await _api.SendMessage(request);
        }
    }
}

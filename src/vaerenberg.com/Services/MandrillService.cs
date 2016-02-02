using System;
using System.Linq;
using System.Threading.Tasks;
using Mandrill;
using Mandrill.Model;
using Microsoft.Extensions.OptionsModel;

namespace Vaerenberg.Services
{
    public class MandrillService : IEmailService
    {
        private readonly MandrillOptions _options;
        private readonly MandrillApi _api;

        public MandrillService(IOptions<AppSettings> settings)
        {
            _options = settings.Value.Mandrill;

            if (string.IsNullOrEmpty(_options.ApiKey))
            {
                throw new InvalidOperationException("A Mandrill API key needs to be configured.");
            }

            _api = new MandrillApi(_options.ApiKey);
        }

        public async Task Send(string recipient, string subject, string body)
        {
            var message = new MandrillMessage(_options.FromEmail, recipient, subject, body);
            var result = await _api.Messages.SendAsync(message);

            var response = result.FirstOrDefault();
            if (response?.Status == MandrillSendMessageResponseStatus.Invalid)
            {
                throw new InvalidOperationException("Mandrill API reports invalid attempt to send message.");
            }
        }
    }
}

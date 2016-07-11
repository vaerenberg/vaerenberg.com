using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace Vaerenberg.Services
{
    public class SendGridService : IEmailService
    {
        public const string Endpoint = "https://api.sendgrid.com/api/mail.send.json";
        private readonly SendGridOptions _options;
        private readonly HttpClient _http;

        public SendGridService(IOptions<AppSettings> settings)
        {
            _options = settings.Value.SendGrid;

            if (string.IsNullOrEmpty(_options.ApiKey))
            {
                throw new InvalidOperationException("A SendGrid API key needs to be configured.");
            }

            _http = new HttpClient();
            _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _options.ApiKey);
        }

        public async Task Send(string recipient, string subject, string body)
        {
            var content = new MultipartFormDataContent
            {
                { new StringContent(_options.FromEmail), "from" },
                { new StringContent(recipient), "to" },
                { new StringContent(subject), "subject" },
                { new StringContent(body), "html" }
            };

            var response = await _http.PostAsync(Endpoint, content);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new InvalidOperationException($"Sendgrid API error: status={response.StatusCode} content={error}");
            }
        }
    }
}

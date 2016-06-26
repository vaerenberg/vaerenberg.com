using Vaerenberg.Services;

namespace Vaerenberg
{
    public class AppSettings
    {
        public MandrillOptions Mandrill { get; set; }

        public SendGridOptions SendGrid { get; set; }
    }
}
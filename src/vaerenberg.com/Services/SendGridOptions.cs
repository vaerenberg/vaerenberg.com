namespace Vaerenberg.Services;

public class SendGridOptions
{
    public string ApiKey { get; set; } = null!;
    public string FromEmail { get; set; } = null!;
}
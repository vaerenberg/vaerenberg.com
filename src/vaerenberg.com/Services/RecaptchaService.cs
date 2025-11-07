namespace vaerenberg.com.Services;

public interface IRecaptchaService
{
    Task<bool> Validate(string token);
}

public class RecaptchaService(IConfiguration configuration, IHttpClientFactory httpClientFactory) : IRecaptchaService
{
    private readonly string _secret = configuration["GoogleReCaptcha:SecretKey"]
        ?? throw new InvalidOperationException("Missing GoogleReCaptcha:SecretKey in configuration");

    public async Task<bool> Validate(string token)
    {
        var client = httpClientFactory.CreateClient();
        var response = await client.PostAsync(
            "https://www.google.com/recaptcha/api/siteverify",
            new FormUrlEncodedContent(new Dictionary<string, string>
            {
                    { "secret", _secret },
                    { "response", token }
            }));

        if (!response.IsSuccessStatusCode) return false;

        var result = await response.Content.ReadFromJsonAsync<RecaptchaResponse>();
        return result?.Success == true && result.Score >= 0.5;
    }

    private class RecaptchaResponse
    {
        public bool Success { get; set; }
        public double Score { get; set; }
        public string Action { get; set; }
        public DateTime ChallengeTs { get; set; }
        public string Hostname { get; set; }
        public List<string> ErrorCodes { get; set; }
    }
}

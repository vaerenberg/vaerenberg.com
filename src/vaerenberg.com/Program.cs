using Vaerenberg.Services;
using Vaerenberg.Tenerife;
using Vaerenberg;
using Microsoft.Extensions.Azure;
using vaerenberg.com.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOptions();
builder.Services.Configure<AppSettings>(builder.Configuration);
builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient();
builder.Services.AddAzureClients(x =>
{
    x.AddEmailClient(builder.Configuration.GetValue<string>("AzureEmail:ConnectionString"));
});
builder.Services.AddScoped<IEmailService, AzureEmail>();
builder.Services.AddScoped<IRecaptchaService, RecaptchaService>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseWwwToNakedDomainRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

// Explicitly support the campaign URL with and without a trailing slash.
app.MapGet("/tenerife-2026", () => Results.Redirect("/tenerife-2026/", permanent: false));
app.MapGet("/tenerife-2026/", (IWebHostEnvironment env) =>
    Results.File(Path.Combine(env.WebRootPath, "tenerife-2026", "index.html"), "text/html"));

app.MapTenerifeApi();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

using Vaerenberg.Services;
using Vaerenberg;
using Microsoft.Extensions.Azure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOptions();
builder.Services.Configure<AppSettings>(builder.Configuration);
builder.Services.AddControllersWithViews();
builder.Services.AddAzureClients(x =>
{
    x.AddEmailClient(builder.Configuration.GetValue<string>("AzureEmail:ConnectionString"));
});
builder.Services.AddScoped<IEmailService, AzureEmail>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseWwwToNakedDomainRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

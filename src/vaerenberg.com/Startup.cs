using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Text.RegularExpressions;
using Vaerenberg.Services;

namespace Vaerenberg
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder();

            builder.AddJsonFile("appSettings.json");

            if (env.IsDevelopment())
            {
                builder.AddUserSecrets();
            }

            builder.AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();
            services.Configure<AppSettings>(Configuration);

            services.AddMvc();
            services.AddTransient<IEmailService, MandrillService>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseIISPlatformHandler();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseStatusCodePages();
            app.UseMvc();

            app.Use(async (context, next) =>
            {
                const string www = "www.";
                var host = context.Request.Host.ToUriComponent();

                if (context.Request.Method == "GET" && host.ToLower().Contains(www))
                {

                    var withoutWww =
                        context.Request.Scheme + "://" +
                        Regex.Replace(host, www, "", RegexOptions.IgnoreCase) +
                        context.Request.Path;
                    context.Response.Redirect(withoutWww, permanent: true);
                }
                else
                {
                    await next();
                }
            });
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}

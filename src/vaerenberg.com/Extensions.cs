using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Builder;

namespace Vaerenberg
{
    static class Extensions
    {
        public static void UseWwwToNakedDomainRedirection(this IApplicationBuilder app)
        {
            app.Use(async (context, next) =>
            {
                const string www = "www.";
                var host = context.Request.Host.ToUriComponent();

                if (context.Request.Method == "GET" && host.ToLower().Contains(www))
                {
                    var naked =
                        context.Request.Scheme + "://" +
                        Regex.Replace(host, www, "", RegexOptions.IgnoreCase) +
                        context.Request.Path;
                    context.Response.Redirect(naked, permanent: true);
                }
                else
                {
                    await next();
                }
            });
        }
    }
}
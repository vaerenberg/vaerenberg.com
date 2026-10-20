using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Vaerenberg.Tenerife;

public static class TenerifeApi
{
    private static readonly HashSet<string> Activities = new(StringComparer.Ordinal) {
        "siam","medano","anaga","teide","chinyero","boat","snorkel","kayak","stars","laguna","pool","dinner"
    };
    private static readonly HashSet<string> Shared = new(StringComparer.Ordinal) {
        "siam","medano","boat","snorkel","pool","dinner"
    };
    private static readonly HashSet<string> Ratings = new(StringComparer.Ordinal) { "love","like","neutral","no" };
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);

    public sealed class Invite
    {
        public string Name { get; set; } = "";
        public string Group { get; set; } = "";
        public string TokenHash { get; set; } = "";
    }
    public sealed class Ballot
    {
        public Dictionary<string,string> Votes { get; set; } = new();
        public string Idea { get; set; } = "";
        public List<string> Joint { get; set; } = new();
    }
    private sealed class Stored
    {
        public string Name { get; set; } = "";
        public string Group { get; set; } = "";
        public Ballot Ballot { get; set; } = new();
    }

    public static void MapTenerifeApi(this WebApplication app)
    {
        var api = app.MapGroup("/api/tenerife-2026");
        api.AddEndpointFilter(async (context, next) => { context.HttpContext.Response.Headers.CacheControl = "no-store"; return await next(context); });
        api.MapGet("/me", async (HttpContext ctx, IConfiguration cfg) => {
            var me = Authenticate(ctx, cfg);
            if (me == null) return Results.Unauthorized();
            try {
                var blob = Container(cfg).GetBlobClient(BlobName(me));
                var ballot = await blob.ExistsAsync(ctx.RequestAborted)
                    ? (await blob.DownloadContentAsync(ctx.RequestAborted)).Value.Content.ToObjectFromJson<Stored>(Json)?.Ballot
                    : null;
                return Results.Ok(new { name = me.Name, group = me.Group, ballot = ballot ?? new Ballot() });
            } catch (Exception ex) {
                app.Logger.LogError(ex, "Tenerife storage read failed");
                return Results.Problem("Storage temporarily unavailable", statusCode:503);
            }
        });
        api.MapPut("/me", async (HttpContext ctx, IConfiguration cfg, [FromBody] Ballot input) => {
            var me = Authenticate(ctx,cfg);
            if (me == null) return Results.Unauthorized();
            if (input == null || input.Votes == null || input.Idea == null || input.Joint == null || input.Votes.Count > Activities.Count || input.Idea.Length > 1500 ||
                input.Joint.Count > 5 || input.Joint.Any(s => s.Length > 60) ||
                input.Votes.Any(kv => !Activities.Contains(kv.Key) || !Ratings.Contains(kv.Value)))
                return Results.BadRequest(new { error = "Invalid ballot" });
            try {
                var client = Container(cfg).GetBlobClient(BlobName(me));
                var payload = BinaryData.FromObjectAsJson(new Stored { Name=me.Name,Group=me.Group,
                    Ballot=new Ballot { Votes=input.Votes, Idea=input.Idea, Joint=input.Joint } },Json);
                await client.UploadAsync(payload, overwrite:true, cancellationToken:ctx.RequestAborted);
                return Results.NoContent();
            } catch (Exception ex) {
                app.Logger.LogError(ex, "Tenerife storage write failed");
                return Results.Problem("Storage temporarily unavailable",statusCode:503);
            }
        });
        api.MapGet("/results", async (HttpContext ctx,IConfiguration cfg) => {
            var me=Authenticate(ctx,cfg);
            if(me==null)return Results.Unauthorized();
            try {
                var container=Container(cfg);
                var people=new List<Stored>();
                await foreach(var blob in container.GetBlobsAsync(prefix:"ballots/",cancellationToken:ctx.RequestAborted)) {
                    if(!blob.Name.EndsWith(".json",StringComparison.Ordinal))continue;
                    var content=await container.GetBlobClient(blob.Name).DownloadContentAsync(ctx.RequestAborted);
                    var entry=content.Value.Content.ToObjectFromJson<Stored>(Json);
                    if(entry != null && ValidInvite(entry,cfg))people.Add(entry);
                }
                if(me.Group=="gezin")return Results.Ok(new {
                    scope="family", respondents=people.Select(p=>new {p.Name,p.Group,p.Ballot})
                });
                // Non-family members see group-level aggregate only, restricted to potential shared activities.
                // Do not reveal names, comments, or individual family votes.
                var grouped=people.Where(p=>p.Group==me.Group).ToArray();
                var aggregate=Shared.Select(a=>new {
                    activity=a,
                    positive=grouped.Count(p=>p.Ballot.Votes.TryGetValue(a,out var v)&&(v=="love"||v=="like")),
                    total=grouped.Count(p=>p.Ballot.Votes.ContainsKey(a))
                }).ToArray();
                var jointOptions = me.Group == "grootouders"
                    ? new[] { "Met het gezin", "Liever af en toe aansluiten" }
                    : new[] { "Met de Vaerenbergs", "Liever flexibel" };
                var joint = jointOptions.Select(option => new {
                    option,
                    count = grouped.Count(p => p.Ballot.Joint?.Contains(option) == true)
                }).ToArray();
                return Results.Ok(new {scope="guest",group=me.Group,activities=aggregate,joint,respondents=grouped.Length});
            } catch(Exception ex) {
                app.Logger.LogError(ex,"Tenerife results failed");
                return Results.Problem("Storage temporarily unavailable",statusCode:503);
            }
        });
    }

    private static bool ValidInvite(Stored record,IConfiguration cfg)=>
        cfg.GetSection("Tenerife2026:Invitations").Get<Invite[]>()?.Any(i=>i.Name==record.Name && i.Group==record.Group)==true;

    private static Invite? Authenticate(HttpContext context,IConfiguration cfg)
    {
        var header=context.Request.Headers.Authorization.ToString();
        if(!header.StartsWith("Bearer ",StringComparison.OrdinalIgnoreCase))return null;
        var token=header[7..].Trim();
        if(token.Length<32 || token.Length>256)return null;
        var hash=Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token)));
        var invites=cfg.GetSection("Tenerife2026:Invitations").Get<Invite[]>() ?? Array.Empty<Invite>();
        foreach(var invite in invites) {
            if(invite.Group is not ("gezin" or "grootouders" or "soonsen") ||
                string.IsNullOrWhiteSpace(invite.Name) || invite.TokenHash.Length!=64)continue;
            if(CryptographicOperations.FixedTimeEquals(Encoding.ASCII.GetBytes(hash),
                    Encoding.ASCII.GetBytes(invite.TokenHash.ToUpperInvariant())))return invite;
        }
        return null;
    }

    private static BlobContainerClient Container(IConfiguration cfg)
    {
        var connection=cfg["Tenerife2026:StorageConnectionString"];
        var container=cfg["Tenerife2026:Container"] ?? "tenerife-2026";
        if(!string.IsNullOrWhiteSpace(connection)) return new BlobContainerClient(connection,container);
        return new BlobContainerClient(new Uri("https://vaerenberg.blob.core.windows.net/"+container),new DefaultAzureCredential());
    }
    private static string BlobName(Invite invite)
    {
        var key=Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(invite.Group+":"+invite.Name)))
            .ToLowerInvariant();
        return "ballots/"+key+".json";
    }
}

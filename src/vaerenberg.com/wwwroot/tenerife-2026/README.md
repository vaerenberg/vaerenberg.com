# Tenerife Adventure Picker — prototype

This is a standalone, client-side prototype hosted at `/tenerife-2026/` by the existing ASP.NET Core static-file middleware (`UseStaticFiles`).

## Scope
- 12 activities, individual votes, custom suggestions and preference for joint activities.
- Uses browser `localStorage`; supports per-person JSON export and JSON import.
- The family/guest dashboard separation is **demonstration UI only**, not access control.
- No server-side storage, invitations, real authentication or synchronization across devices.

## Testing
Run the existing ASP.NET Core site with `dotnet run --project src/vaerenberg.com/vaerenberg.com.csproj` and open `/tenerife-2026/`.

## Security and next phase
Do **not** use this as a privacy-preserving shared voting application. The client-side demo PIN is embedded in JavaScript, people can select other identities, and anyone with access to local JSON data may inspect answers. Before distributing personal invitation URLs, implement token-based server authorization, tenant/group-scoped API views and central storage. Consider rate limiting, token expiry/revocation, CSRF strategy for authenticated writes and a retention/deletion mechanism.

Publishing requires merging the pull request into `master`, which triggers the existing deployment pipeline. No production deployment is initiated by this branch.

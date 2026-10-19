# Tenerife Adventure Picker — Azure backend

The ASP.NET Core app serves the frontend at `/tenerife-2026/` and the API at `/api/tenerife-2026/`.

## Configuration (Azure App Service → Environment variables)
- `Tenerife2026__StorageConnectionString`: connection string with read/write access to the existing storage account `vaerenberg`.
- `Tenerife2026__Container`: `tenerife-2026`.
- `Tenerife2026__Invitations__0__Name`: `Bart`
- `Tenerife2026__Invitations__0__Group`: `gezin`
- `Tenerife2026__Invitations__0__TokenHash`: SHA-256 hex of a cryptographically random invitation token.
Repeat indexed invitation settings for each participant; group must be `gezin`, `grootouders` or `soonsen`. Never commit the raw tokens, hashes, or connection string to GitHub.

Generate tokens locally using a cryptographically secure generator (e.g. Python `secrets.token_urlsafe(32)`) and compute SHA-256 hashes. Invite links look like `https://vaerenberg.com/tenerife-2026/?token=<secret>`. Treat links as passwords. The browser stores tokens in sessionStorage; sharing links exposes the token to the recipient and browser history. Use a no-referrer policy before external image links.

## API
- `GET /api/tenerife-2026/me` — own ballot
- `PUT /api/tenerife-2026/me` — save own ballot
- `GET /api/tenerife-2026/results` — family: all individual ballots; guest: only aggregate votes of the guest's own group on predefined joint activities

All API calls require `Authorization: Bearer <token>`.

## Caveats before production
- No tokens are provisioned yet; configure invitation settings before use.
- The legacy local demo mode is still present for testing, and is not suitable for privacy-sensitive shared use. Disable it before public launch.
- Writes are last-write-wins per participant. Simultaneous sessions may overwrite one another.
- Add rate limiting, security headers, explicit token revocation, and a deletion/retention policy before broad sharing.
- Storage account credentials must be held in Azure App Service configuration or Key Vault, never client-side.
- No automated build or end-to-end tests have been run in this environment. Review and test before merging.

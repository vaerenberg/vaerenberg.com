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

## Activity overview map
The map reuses the activity coordinates, cards and individual votes from the picker. Its basemap is a locally served island contour, without external tile requests, API keys, ferry routes, borders or points of interest. Nearby activity icons are separated with leader lines and can also be selected using the activity dropdown.

`tenerife-coastline.json` contains only the Tenerife polygon from [Natural Earth 1:10m Admin 0 Countries](https://github.com/nvkelso/natural-earth-vector/blob/9380cca83db5f9aef52d5e762765100745f84b27/geojson/ne_10m_admin_0_countries.geojson). Natural Earth data is [public domain](https://www.naturalearthdata.com/about/terms-of-use/). Leaflet 1.9.4 is vendored with its license in `vendor/leaflet/`.

The general `joint` preferences are not activity-specific. The legacy stored value `Met de Vaerenbergs` remains unchanged for compatibility with existing ballots and server-side aggregate counts; the interface displays it as `Met de Vaerenbergen`.

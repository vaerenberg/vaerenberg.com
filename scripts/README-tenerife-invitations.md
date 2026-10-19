# Tenerife invitations — run locally

From the repository root:

```bash
python scripts/generate-tenerife-invitations.py
```

This creates a private `tenerife-invitations/` directory containing:

- `invitation-links.csv`: one unique invitation URL per participant (secret!)
- `azure-app-settings.json`: indexed Azure App Service environment variables containing SHA-256 token hashes and participant identities

In Azure Portal open **App Services → vaerenbergbvba → Settings → Environment variables → App settings → Advanced edit**. Carefully merge the entries from `azure-app-settings.json` with existing settings (do **not** replace unrelated app settings), then apply and save. Alternatively, add the entries individually. The backend uses managed identity by default; no storage connection string is necessary. The system-assigned identity needs **Storage Blob Data Contributor** on container `tenerife-2026` in storage account `vaerenberg`.

**Never commit, upload or send either generated file to anyone other than the intended recipients of individual invitation links.** Do not put the files in cloud-synced public directories. After configuration, test one link and verify the API can read and write its blob. Generating again produces *new* tokens and invalidates old links if you replace the app settings.

The initial participant names for the Soonsen group are placeholders. Edit `PARTICIPANTS` in the generator before running to use the intended names. A participant identity is the exact combination of name and group; changing it later will create a new blob key.

Do not merge the PR before build and end-to-end authorization checks are completed.

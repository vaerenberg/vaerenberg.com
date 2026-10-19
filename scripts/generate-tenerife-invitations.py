#!/usr/bin/env python3
"""Generate Tenerife invitation URLs and Azure App Service settings locally.

Requires Python 3.10+. No external packages. Never commit the generated files.
"""
import csv
import hashlib
import json
import secrets
from pathlib import Path

BASE_URL = "https://vaerenberg.com/tenerife-2026/"
PARTICIPANTS = [
    ("Bart", "gezin"),
    ("Griet", "gezin"),
    ("Jorijn", "gezin"),
    ("Nienke", "gezin"),
    ("Marie", "gezin"),
    ("Opa", "grootouders"),
    ("Oma", "grootouders"),
    ("Soonsen ouder 1", "soonsen"),
    ("Soonsen ouder 2", "soonsen"),
    ("Soonsen dochter 1", "soonsen"),
    ("Soonsen dochter 2", "soonsen"),
    ("Soonsen oma", "soonsen"),
]

def main():
    output = Path("tenerife-invitations")
    output.mkdir(mode=0o700, exist_ok=True)
    links = output / "invitation-links.csv"
    settings = output / "azure-app-settings.json"
    if links.exists() or settings.exists():
        raise SystemExit("Output files already exist. Move/delete them explicitly before rotating invitations.")
    rows, app_settings = [], []
    for index, (name, group) in enumerate(PARTICIPANTS):
        token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest().upper()
        prefix = f"Tenerife2026__Invitations__{index}__"
        app_settings.extend([
            {"name": prefix + "Name", "value": name, "slotSetting": False},
            {"name": prefix + "Group", "value": group, "slotSetting": False},
            {"name": prefix + "TokenHash", "value": token_hash, "slotSetting": False},
        ])
        rows.append({"name": name, "group": group, "url": BASE_URL + "?token=" + token})
    app_settings.append({"name": "Tenerife2026__Container", "value": "tenerife-2026", "slotSetting": False})
    with links.open("x", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=["name", "group", "url"])
        writer.writeheader()
        writer.writerows(rows)
    with settings.open("x", encoding="utf-8") as handle:
        json.dump(app_settings, handle, indent=2, ensure_ascii=False)
        handle.write("\n")
    try:
        links.chmod(0o600)
        settings.chmod(0o600)
    except OSError:
        pass
    print(f"Generated {len(rows)} unique invitations.")
    print(f"Private invitation links: {links}")
    print(f"Azure Portal > App Service > Environment variables > Advanced edit: {settings}")
    print("IMPORTANT: Keep both files private; do not upload them to GitHub or share in chat.")
    print("The JSON file contains token hashes, not raw tokens; keep it private nonetheless.")

if __name__ == "__main__":
    main()

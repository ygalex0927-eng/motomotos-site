# motomotos.com — site v2

Static site, no build step. English by default; 中文 (¥19.9) via the EN / 中文 switch or `?region=cn`. One price per page.

- `index.html`, `css/site.css`, `js/main.js` (motion + scroll scenes), `js/i18n.js` (all copy, prices, Creem link, install command)
- `assets/en|zh/` — real app frames, captured offscreen from the app (`~/Documents/Codex/2026-10-20/motomotos-launch15/capture/export_site.py`)
- `assets/film/launch.mp4` — the 15 s launch film
- `privacy.html`, `terms.html`, `install.sh` — copied unchanged from `~/claude-workdir/motomotos-web/public/`
- `qa/` — Grok 4.7 QA run (brief, script, 109 screenshots, report). Not needed on the server.

Preview: `python3 -m http.server 8811` here, open http://localhost:8811/ (`?region=cn` for 中文).

## Deploy (not done yet — needs 膏哥's go-ahead)
Upload everything except `qa/` and `README.md` to the web root that serves motomotos.com (ECS `/var/www/motomotos`, see `~/claude-workdir/motomotos-web/DEPLOY.md`). Keep the server's existing `/downloads/Motomotos.dmg` and `/install.sh`.
After any CSS/JS edit, bump the `?v=` in `index.html` and the `./i18n.js?v=` import in `js/main.js` so browsers fetch the new files.

## Facts the copy relies on (checked against the app source on 2026-10-20)
- Binary is arm64 only → "Apple silicon". The island needs a built-in notch (`findBuiltinNotch`).
- After the trial only paid widgets lock; clock and cat keep working (`License.blocks`).
- Approvals on the island: Grok CLI. Quota: Grok CLI, Codex; Claude Code after connecting its status line.
- Lyrics: NetEase only. Apple Music / Spotify: cover + controls.

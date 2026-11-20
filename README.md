# motomotos.com — site v2

Static site. English by default; 中文 (¥19.9) via the EN / 中文 switch or `?region=cn`. One price per page.
Audience is international (2026-11-19): English pages are what search engines and AI assistants read.

## Build (2026-11)
`node tools/build.mjs` (no dependencies) writes the English copy straight into the HTML so crawlers that don't run
JavaScript see the whole page. Edit the sources, then rebuild — don't hand-edit the generated files.

- Sources: `src/home.html` (home template), `js/i18n.js` + `js/copy2.js` (copy), `src/pages.mjs` (guides, comparison, changelog).
- Generated: `index.html`, `compare/`, `guides/…/`, `changelog/`, `404.html`, `sitemap.xml`, `llms.txt`. `robots.txt` is hand-written.
- The page script still fills the same elements at runtime and switches to 中文 for mainland-China visitors.
- Cache-busting: bump `V` in `tools/build.mjs` and the `./i18n.js?v=` / `./copy2.js?v=` imports in `js/v2.js`.
- When a fact changes (version, price, features), update `VERSION`/`RELEASED` in `tools/build.mjs`, the copy, and the `updated` date of affected pages.

- `index.html`, `css/site.css`, `js/main.js` (motion + scroll scenes), `js/i18n.js` (all copy, prices, Creem link, install command)
- `assets/en|zh/` — real app frames, captured offscreen from the app (`~/Documents/Codex/2026-10-20/motomotos-launch15/capture/export_site.py`)
- `assets/film/launch.mp4` — the 15 s launch film
- `privacy.html`, `terms.html`, `install.sh` — copied from `~/claude-workdir/motomotos-web/public/`. Privacy and terms were corrected here on 2026-11-19 (hosting, the IP-country lookup, a stale domain line); edit them here from now on.
- `qa/` — Grok 4.7 QA run (brief, script, 109 screenshots, report). Not needed on the server.

Preview: `python3 -m http.server 8811` here, open http://localhost:8811/ (`?region=cn` for 中文).

## Deploy (not done yet — needs 膏哥's go-ahead)
Upload everything except `qa/`, `src/`, `tools/` and `README.md` to the web root that serves motomotos.com (ECS `/var/www/motomotos`, see `~/claude-workdir/motomotos-web/DEPLOY.md`). Keep the server's existing `/downloads/Motomotos.dmg` and `/install.sh`.
After any CSS/JS edit, bump the cache version (see Build) so browsers fetch the new files.

## Facts the copy relies on (checked against the app source on 2026-10-20)
- Binary is arm64 only → "Apple silicon". The island needs a built-in notch (`findBuiltinNotch`).
- After the trial only paid widgets lock; clock and cat keep working (`License.blocks`).
- Approvals on the island: Grok CLI. Quota: Grok CLI, Codex; Claude Code after connecting its status line.
- Lyrics: NetEase only. Apple Music / Spotify: cover + controls.

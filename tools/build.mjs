// Builds the static site: node tools/build.mjs
//
// Why: the page copy lives in js/i18n.js + js/copy2.js and the browser fills it in. Search engines and AI crawlers
// mostly don't run JavaScript, so they saw an empty page. This writes the English copy straight into the HTML.
// The page script still runs and fills the same elements (and switches to 中文 for visitors in mainland China).
//
// Writes: index.html, the content pages in src/pages.mjs (<path>/index.html), 404.html, sitemap.xml, llms.txt.
// No dependencies. Run it after any copy change, then deploy (see README.md).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyFor, CREEM_BUY, INSTALL_CMD } from '../js/i18n.js';
import { copy2For } from '../js/copy2.js';
import { pages, DL } from '../src/pages.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://motomotos.com';
const V = '202611201500';            // cache-busting for css/js; also bump the imports in js/v2.js
const VERSION = '1.1.2';
const RELEASED = '2026-11-20';
const OG_IMAGE = `${SITE}/assets/film/poster.jpg`;
const T = { ...copyFor('overseas'), ...copy2For('overseas') };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (s) => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const out = (rel, text) => { const p = join(ROOT, rel); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, text); return rel; };
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

const ORG = {
  '@type': 'Organization', '@id': `${SITE}/#org`, name: 'motomotos', url: `${SITE}/`,
  logo: `${SITE}/assets/icon-256.png`, email: 'support@motomotos.com',
  sameAs: ['https://github.com/ygalex0927-eng/motomotos-releases'],
};

function head({ title, desc, path, type = 'website', extra = '' }) {
  const url = SITE + path;
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(desc)}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:site_name" content="motomotos">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(desc)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${OG_IMAGE}">`,
    `<meta property="og:image:width" content="1920">`,
    `<meta property="og:image:height" content="1080">`,
    `<meta property="og:locale" content="en_US">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(desc)}">`,
    `<meta name="twitter:image" content="${OG_IMAGE}">`,
    extra,
  ].filter(Boolean).join('\n');
}

// ---------------- home ----------------
const CHIPS = ['working', 'band', 'expanded', 'music', 'split', 'waiting', 'done', 'error', 'focus'];
const MOMENTS = ['music', 'split', 'done', 'waiting', 'error', 'focus'];
const MOODS = ['working', 'busy', 'waiting', 'fishing', 'music', 'sleeping', 'happy', 'error', 'eating', 'message', 'focusing'];

function fillCopy(html) {
  // <tag … data-t="key" …></tag> → text;  data-th → HTML from our own copy files.
  return html.replace(/<(\w+)([^>]*?)\sdata-(t|th)="([^"]+)"([^>]*)><\/\1>/g, (m, tag, a, kind, key, b) => {
    const v = T[key];
    if (typeof v !== 'string') throw new Error(`missing copy: ${key}`);
    return `<${tag}${a} data-${kind}="${key}"${b}>${kind === 't' ? esc(v) : v}</${tag}>`;
  });
}

function homeLd() {
  const faq = T.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }));
  return ld({
    '@context': 'https://schema.org',
    '@graph': [
      ORG,
      { '@type': 'WebSite', '@id': `${SITE}/#site`, url: `${SITE}/`, name: 'motomotos', publisher: { '@id': `${SITE}/#org` }, inLanguage: 'en' },
      {
        '@type': 'SoftwareApplication', '@id': `${SITE}/#app`, name: 'motomotos',
        description: T.desc, url: `${SITE}/`, image: OG_IMAGE,
        applicationCategory: 'UtilitiesApplication', applicationSubCategory: 'Dynamic Island for Mac',
        operatingSystem: 'macOS 15 or later', softwareVersion: VERSION, dateModified: RELEASED,
        downloadUrl: SITE + DL, installUrl: SITE + DL,
        inLanguage: ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'de'],
        featureList: [
          'Dynamic Island for the MacBook notch; also works on Macs without a notch',
          'Claude Code, Codex and Grok usage limits with reset times',
          'Alerts when AI agents finish, fail or need approval: Claude Code, Codex, Grok, DeepSeek Harness, Hermes, WorkBuddy',
          'Alerts from any tool with the motomotos notify command',
          '17 widgets: music, calendar, pomodoro, battery, launcher, weather, to-do, notes and more',
          'Custom island background: picture, GIF or video',
          'A cat with 11 moods',
        ],
        offers: { '@type': 'Offer', price: '4.99', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${SITE}/#pricing` },
        publisher: { '@id': `${SITE}/#org` },
      },
      { '@type': 'FAQPage', '@id': `${SITE}/#faq`, mainEntity: faq },
    ],
  });
}

function buildHome() {
  let html = readFileSync(join(ROOT, 'src/home.html'), 'utf8');
  const v2 = (p) => `/assets/v2/${p}`;
  const panel = `<div class="static"><h3>${esc(T['wg.more.big'])} ${esc(T['wg.more.h'])}</h3><ul>${[
    ['wg.usage.h', 'wg.usage.p'], ['wg.pomodoro.h', 'wg.pomodoro.p'], ['wd.m.h', 'wd.m.p'], ['wg.clock.h', 'wg.clock.p'],
    ['wg.battery.h', 'wg.battery.p'], ['wg.tokenuse.h', 'wg.tokenuse.p'], ['wd.a.h', 'wd.a.p'],
  ].map(([h, p]) => `<li><b>${esc(T[h])}</b> — ${esc(T[p])}</li>`).join('')}<li>${esc(T['wg.more.p'])} ${esc(T['wg.tags'].join(', '))}.</li></ul></div>`;
  const vars = {
    HEAD: head({
      title: T.title, desc: T.desc, path: '/',
      extra: `<meta name="keywords" content="Dynamic Island for Mac, MacBook notch app, notch app, Claude Code usage, Codex usage, AI agent alerts, Mac menu bar app, pomodoro">\n${homeLd()}`,
    }),
    V,
    BUY_PILL: esc(T['nav.buy']),
    HERO_BUY: esc(T['hero.cta2']),
    CHIPS: CHIPS.map((s) => `<button class="chip" type="button" data-s="${s}">${esc(T['chip.' + s])}</button>`).join(''),
    MOMENTS: MOMENTS.map((m) => `<article class="moment reveal in" data-m="${m}"><div class="mtext"><h3>${esc(T[`mo.${m}.h`])}</h3><p>${esc(T[`mo.${m}.p`])}</p></div></article>`).join(''),
    PANEL: panel,
    MOODS: MOODS.map((m, i) => `<li data-m="${m}"${m === 'working' ? ' class="on"' : ''}><span class="n">${String(i + 1).padStart(2, '0')}</span><span>${esc(T['mn.' + m])}</span></li>`).join(''),
    CAT_SRC: v2('cat/working.webp'),
    CAT_ALT: esc(T['mn.working']),
    CAT_CAPTION: esc(`${T['mn.working']} — ${T['m.working']}`),
    PRICE_NUM: esc(T['price.amount']),
    BUY_ATTRS: `href="${esc(CREEM_BUY)}" target="_blank" rel="noopener"`,
    BUY_TEXT: esc(T['price.cta']),
    CMD: esc('~ % ' + INSTALL_CMD),
    FAQ: T.faq.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join(''),
  };
  html = html.replace(/\{\{(\w+)\}\}/g, (m, k) => { if (!(k in vars)) throw new Error(`unknown placeholder ${k}`); return vars[k]; });
  html = fillCopy(html);
  const left = html.match(/data-th?="[^"]+"[^>]*><\//g);
  if (left) throw new Error(`empty copy left: ${left.join(' ')}`);
  return out('index.html', html);
}

// ---------------- content pages ----------------
const NAV = [['compare', 'Compare', '/compare/'], ['guides', 'Guides', '/guides/claude-code-usage-in-notch/'], ['changelog', 'Changelog', '/changelog/']];

function shell({ headHtml, nav, main }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${headHtml}
<meta name="theme-color" content="#0B0B0D">
<link rel="icon" href="/assets/favicon.png">
<link rel="apple-touch-icon" href="/assets/icon-256.png">
<link rel="stylesheet" href="/assets/fonts/jb.css">
<link rel="stylesheet" href="/css/v2.css?v=${V}">
<link rel="stylesheet" href="/css/page.css?v=${V}">
</head>
<body>
<header class="bar">
  <a class="brand" href="/"><img src="/assets/icon-256.png" alt="" width="24" height="24"><span>motomotos</span></a>
  <nav class="navlinks" aria-label="Site">${NAV.map(([k, label, href]) => `<a href="${href}"${k === nav ? ' class="on" aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
  <div class="right"><a class="btn btn-primary btn-sm" href="${DL}">Download</a></div>
</header>
${main}
<footer>
  <div class="wm">motomotos</div>
  <nav class="more" aria-label="Guides">
    <a href="/compare/">Dynamic Island apps for Mac, compared</a>
    <a href="/guides/claude-code-usage-in-notch/">How to see Claude Code usage in the notch</a>
    <a href="/guides/ai-agent-alerts-in-notch/">Get notified when Claude Code or Codex finishes</a>
    <a href="/changelog/">Changelog</a>
  </nav>
  <div class="row">
    <p style="margin:0">${esc(T['foot.tag'])}</p>
    <nav>
      <a href="/">Home</a>
      <a href="/privacy.html">Privacy</a>
      <a href="/terms.html">Terms</a>
      <a href="https://github.com/ygalex0927-eng/motomotos-releases" target="_blank" rel="noopener">GitHub</a>
      <a href="mailto:support@motomotos.com">Support · support@motomotos.com</a>
    </nav>
  </div>
  <p class="legal"><span>© 2026 motomotos</span> · <span>${T['foot.beian']}</span></p>
</footer>
</body>
</html>
`;
}

const fmtDate = (d) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

function buildPage(p) {
  const url = SITE + p.path;
  const crumbs = [['Home', '/'], ...p.crumbs];
  const crumbLd = { '@type': 'BreadcrumbList', itemListElement: crumbs.map(([name, href], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + href })) };
  const doc = p.type === 'WebPage'
    ? { '@type': 'WebPage', '@id': `${url}#page`, url, name: p.title, description: p.desc, dateModified: p.updated, inLanguage: 'en', isPartOf: { '@id': `${SITE}/#site` }, about: { '@id': `${SITE}/#app` } }
    : { '@type': p.type, '@id': `${url}#article`, headline: p.h1, description: p.desc, url, mainEntityOfPage: url, image: OG_IMAGE, datePublished: p.published, dateModified: p.updated, inLanguage: 'en', author: { '@id': `${SITE}/#org` }, publisher: { '@id': `${SITE}/#org` }, about: { '@id': `${SITE}/#app` } };
  const headHtml = head({ title: p.title, desc: p.desc, path: p.path, type: p.type === 'WebPage' ? 'website' : 'article', extra: ld({ '@context': 'https://schema.org', '@graph': [ORG, doc, crumbLd] }) });
  // Visible crumbs skip a repeated last link (guides list = the guide itself).
  const shown = crumbs.filter(([, href], i) => i === 0 || i === crumbs.length - 1 || href !== crumbs[crumbs.length - 1][1]);
  const crumbHtml = `<nav class="crumbs" aria-label="Breadcrumb">${shown.map(([n, h], i) => (i < shown.length - 1 ? `<a href="${h}">${esc(n)}</a><span aria-hidden="true">/</span>` : `<span>${esc(n)}</span>`)).join('')}</nav>`;
  const related = p.related?.length ? `<div class="rel"><h2>Related</h2><ul>${p.related.map(([n, h]) => `<li><a href="${h}">${esc(n)}</a></li>`).join('')}</ul></div>` : '';
  const main = `<main class="doc">
${crumbHtml}
<article>
<h1>${esc(p.h1)}</h1>
<p class="lead">${esc(p.lead)}</p>
<p class="updated">Updated <time datetime="${p.updated}">${fmtDate(p.updated)}</time></p>
${p.body.trim()}
</article>
${related}
</main>`;
  return out(join(p.path.replace(/^\//, ''), 'index.html'), shell({ headHtml, nav: p.nav, main }));
}

function build404() {
  const main = `<main class="notfound"><div><h1>This page doesn’t exist.</h1><p>It may have moved. Try one of these:</p><div class="cta"><a class="btn btn-primary" href="/">motomotos home</a><a class="btn btn-ghost" href="/compare/">Compare notch apps</a></div></div></main>`;
  return out('404.html', shell({ headHtml: `<title>Page not found — motomotos</title>\n<meta name="robots" content="noindex">`, nav: '', main }));
}

// ---------------- sitemap + llms.txt ----------------
function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [['/', today], ...pages.map((p) => [p.path, p.updated]), ['/privacy.html', '2026-11-19'], ['/terms.html', '2026-11-19']];
  return out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([p, d]) => `  <url><loc>${SITE}${p}</loc><lastmod>${d}</lastmod></url>`).join('\n')}
</urlset>
`);
}

function buildLlms() {
  const faq = T.faq.map(([q, a]) => `### ${q}\n\n${strip(a)}`).join('\n\n');
  return out('llms.txt', `# motomotos

> motomotos is a Dynamic Island app for Mac. It turns the MacBook notch into a live island with 17 widgets (music, calendar, pomodoro timer, battery, app launcher and more) and shows what AI coding agents are doing — Claude Code, Codex, Grok, DeepSeek Harness, Hermes and WorkBuddy — how much usage they have left, and when they finish, fail or need approval. 10 days free, then $4.99 once.

## Key facts

- Platform: macOS 15 or later. Best on a MacBook with a notch; on Macs without a notch, or with the lid closed on an external display, the island sits at the top middle of the menu bar.
- Price: free for 10 days with every feature, then a one-time $4.99 (no subscription), on up to 3 of your Macs. After the trial, paid widgets lock; the island, the clock and the cat keep working.
- Usage limits: Claude Code (5-hour and 7-day windows, through an opt-in status line), Codex and Grok CLI, with reset times. Numbers that can't be read are shown as unavailable, never estimated.
- Alerts: done, error and waiting for approval, with one click back to the right terminal. Any other tool can send an alert with \`motomotos notify\` or \`motomotos run -- <command>\`.
- Widgets: music (Apple Music, Spotify; lyrics for NetEase Cloud Music), calendar, pomodoro, battery, launcher, weather, to-do, notes, stickies, photos, mirror, shortcuts, volume and brightness HUD, token usage, custom background (picture, GIF or video), and a cat with 11 moods.
- Languages: English, Simplified Chinese, Traditional Chinese, Japanese, Korean, German.
- Privacy: runs on the Mac; doesn't read the keychain, collect credentials or upload code or chats.
- Download: ${SITE}${DL} — signed with a Developer ID and notarized by Apple. Current version ${VERSION} (released ${RELEASED}).
- Support: support@motomotos.com

## Pages

- [motomotos — home](${SITE}/): features, pricing, download and FAQ
- [Dynamic Island apps for Mac, compared](${SITE}/compare/): motomotos, NotchNook, Boring Notch, Atoll, Alcove, Vibe Island and open-source agent notch apps
- [How to see Claude Code usage limits in your MacBook notch](${SITE}/guides/claude-code-usage-in-notch/)
- [Get notified when Claude Code or Codex finishes, fails or needs approval](${SITE}/guides/ai-agent-alerts-in-notch/)
- [Changelog](${SITE}/changelog/)

## FAQ

${faq}

## Optional

- [Releases on GitHub](https://github.com/ygalex0927-eng/motomotos-releases)
- [Privacy policy](${SITE}/privacy.html)
- [Terms](${SITE}/terms.html)
`);
}

const written = [buildHome(), ...pages.map(buildPage), build404(), buildSitemap(), buildLlms()];
console.log(written.join('\n'));

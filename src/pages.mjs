// English content pages. tools/build.mjs turns each into <path>/index.html.
// Every claim about motomotos was checked against the app source (local-notch @ 299671d, 1.1.0) and the
// GitHub release notes. Claims about other apps were checked on 2026-11-19 against their own sites, GitHub
// READMEs and public listings; keep them short and neutral, and update `updated` whenever a fact changes.

export const DL = '/downloads/Motomotos.dmg';

const cta = `<div class="cta"><a class="btn btn-primary" href="${DL}">Download motomotos · 10 days free</a><p class="fine">$4.99 once after the trial · macOS 15 or later</p></div>`;

export const pages = [
  {
    path: '/compare/',
    nav: 'compare',
    type: 'Article',
    title: 'Dynamic Island apps for Mac compared (2026): NotchNook, Boring Notch, Alcove, Vibe Island, motomotos',
    desc: 'Which Dynamic Island app should you put in your MacBook notch? General notch apps (NotchNook, Boring Notch, Atoll, Alcove) and apps for AI coding agents (Vibe Island, CodeIsland, Open Island, Vibe Notch, Notchi, motomotos) compared by focus, price model and Claude Code / Codex support.',
    h1: 'Dynamic Island apps for Mac, compared',
    lead: 'Several apps turn the MacBook notch into a Dynamic Island. They fall into two groups: general notch apps built around music, files and the calendar, and apps built for AI coding agents such as Claude Code and Codex. Here is how they differ, and which one fits you.',
    published: '2026-11-19',
    updated: '2026-11-19',
    crumbs: [['Compare', '/compare/']],
    body: `
<div class="tldr">
  <h2>Short answer</h2>
  <ul>
    <li><strong>Free and open source:</strong> Boring Notch or Atoll; for coding agents, CodeIsland or Open Island.</li>
    <li><strong>Music controls and a file shelf, very polished:</strong> NotchNook.</li>
    <li><strong>A notch just for your coding agents — sessions, approvals, usage limits:</strong> CodeIsland or Open Island (free), or Vibe Island (paid).</li>
    <li><strong>One app for your AI agents <em>and</em> everyday widgets (music, calendar, pomodoro, battery, launcher), paid once:</strong> motomotos.</li>
  </ul>
</div>

<h2>motomotos at a glance</h2>
<div class="tbl"><table>
  <tr><th>What it is</th><td>A Dynamic Island for the Mac notch: 17 widgets, plus the status, usage left and alerts of your AI coding agents.</td></tr>
  <tr><th>Price</th><td>10 days free with every feature, then $4.99 once. No subscription. Up to 3 of your Macs.</td></tr>
  <tr><th>Requirements</th><td>macOS 15 or later. Best on a MacBook with a notch; on a Mac without one (or with the lid closed on an external display) the island sits at the top middle of the menu bar.</td></tr>
  <tr><th>AI agents</th><td>Claude Code, Codex, Grok, DeepSeek Harness, Hermes and WorkBuddy — desktop apps and terminals, one switch each. Anything else can light up the island with the <code>motomotos notify</code> command.</td></tr>
  <tr><th>Usage limits</th><td>Claude Code (5-hour and 7-day windows), Codex and Grok CLI, with reset times. If a number can’t be read, it says so instead of estimating.</td></tr>
  <tr><th>Alerts</th><td>Done, failed, waiting for approval. One click takes you back to the right terminal.</td></tr>
  <tr><th>Widgets</th><td>Music (Apple Music, Spotify; lyrics for NetEase Cloud Music), calendar, pomodoro, battery, launcher, weather, to-do, notes, stickies, photos, mirror, shortcuts, volume and brightness HUD, token usage, and a background of your own picture, GIF or video. Plus a cat with 11 moods.</td></tr>
  <tr><th>Languages</th><td>English, 简体中文, 繁體中文, 日本語, 한국어, Deutsch.</td></tr>
  <tr><th>Privacy</th><td>Runs on your Mac. Doesn’t read your keychain, collect credentials or upload your code or chats.</td></tr>
</table></div>

<h2>General notch apps</h2>
<h3>NotchNook</h3>
<p>From <a href="https://lo.cafe/notchnook" rel="noopener">lo.cafe</a>, and one of the best-known notch apps: media controls, a file shelf you drag files through, and the calendar. It’s paid — a lifetime license or a monthly plan, with one license covering two Macs, according to lo.cafe. Pick it if music and quick file drops are what you want from the notch.</p>
<h3>Boring Notch</h3>
<p>Free and open source (<a href="https://github.com/TheBoredTeam/boring.notch" rel="noopener">TheBoredTeam/boring.notch</a> on GitHub), community-built, with Dynamic Island-style animations and music controls; it also installs with Homebrew. Pick it if free and open source matters most.</p>
<h3>Atoll</h3>
<p>Free and open source (<a href="https://github.com/Ebullioscopic/Atoll" rel="noopener">Ebullioscopic/Atoll</a> on GitHub): media controls, live activities, lock screen widgets, system stats, a file shelf, clipboard history, calendar previews and timers. A strong pick if you want the most features for free.</p>
<h3>Alcove</h3>
<p>A paid app (<a href="https://tryalcove.com" rel="noopener">tryalcove.com</a>) that brings Dynamic Island behaviour to the notch, with media controls, alerts and HUDs. Also on Homebrew.</p>

<h2>Notch apps for AI coding agents</h2>
<h3>Vibe Island</h3>
<p>A paid app (<a href="https://vibeisland.app" rel="noopener">vibeisland.app</a>) focused on Claude Code and Codex: live 5-hour and weekly usage, session monitoring and approving tool calls from the notch. Pick it if your notch is only for coding agents.</p>
<h3>Open-source agent projects</h3>
<p>Several free, open-source projects bring coding agents to the notch:</p>
<ul>
  <li><a href="https://github.com/wxtsky/CodeIsland" rel="noopener">CodeIsland</a> (MIT) covers 30+ coding tools: live status, approving tool calls and answering questions from the notch, Claude usage and plan limits, and an iPhone and Apple Watch companion.</li>
  <li><a href="https://github.com/Octane0411/open-vibe-island" rel="noopener">Open Island</a> (GPL v3) covers 15 agents and many terminals and IDEs: session status, approvals, Claude Code and Codex usage, and one click back to the right terminal. No account, no telemetry.</li>
  <li><a href="https://github.com/farouqaldori/vibe-notch" rel="noopener">Vibe Notch</a> (formerly Claude Island; Apache 2.0) is built around Claude Code: live sessions, approvals from the notch and chat history.</li>
  <li><a href="https://github.com/sk-ruban/notchi" rel="noopener">Notchi</a> (GPL v3) is a notch companion for Claude Code and Codex: each session gets a mascot that reacts to what it’s doing, plus usage, cost and token stats.</li>
</ul>
<p>They focus on coding agents rather than everyday widgets. Pick one of them if you want free and open source and don’t need music, a calendar or a timer in the same place.</p>
<h3>motomotos</h3>
<p>Sits between the two groups: a full Dynamic Island with 17 widgets that also follows six AI agents — what each is doing, how much usage is left and when it resets, and an alert the moment one finishes, fails or needs you. $4.99 once.</p>

<h2>How to choose</h2>
<ol>
  <li><strong>Do you code with AI agents?</strong> If not, a general notch app is all you need.</li>
  <li><strong>Which agents?</strong> motomotos follows Claude Code, Codex, Grok, DeepSeek Harness, Hermes and WorkBuddy, and any other tool through <code>motomotos notify</code>. Check each app’s site for its own list.</li>
  <li><strong>Once or monthly?</strong> motomotos is a one-time $4.99. Some others offer a subscription.</li>
  <li><strong>Open source?</strong> Boring Notch, Atoll and the open-source agent projects.</li>
  <li><strong>Your macOS version.</strong> motomotos needs macOS 15 or later.</li>
  <li><strong>No notch?</strong> motomotos still works: the island sits at the top middle of the menu bar.</li>
</ol>

<p class="note">Written by the motomotos team, so read it with that in mind. Facts about other apps come from their own websites, GitHub pages and public listings as of November 2026; prices and features change, so check their sites before you buy. Spotted a mistake? Email <a href="mailto:support@motomotos.com">support@motomotos.com</a> and we’ll fix it.</p>
${cta}`,
    related: [
      ['How to see Claude Code usage limits in your MacBook notch', '/guides/claude-code-usage-in-notch/'],
      ['Get notified when Claude Code or Codex finishes or needs approval', '/guides/ai-agent-alerts-in-notch/'],
    ],
  },

  {
    path: '/guides/claude-code-usage-in-notch/',
    nav: 'guides',
    type: 'TechArticle',
    title: 'How to see Claude Code usage limits (5-hour and weekly) in your MacBook notch',
    desc: 'Show Claude Code’s 5-hour and 7-day usage, with reset times, in the Mac notch. A step-by-step guide with motomotos: connect the Claude Code status line once and the numbers stay in the notch.',
    h1: 'How to see Claude Code usage limits in your MacBook notch',
    lead: 'Claude Code’s subscription limits come in two windows: 5 hours and 7 days. motomotos puts both percentages and their reset times in your Mac’s notch, so you can check how much is left without leaving what you’re doing.',
    published: '2026-11-19',
    updated: '2026-11-19',
    crumbs: [['Guides', '/guides/claude-code-usage-in-notch/'], ['Claude Code usage in the notch', '/guides/claude-code-usage-in-notch/']],
    body: `
<h2>What you need</h2>
<ul>
  <li>A Mac on macOS 15 or later.</li>
  <li><a href="${DL}">motomotos</a> — free for 10 days.</li>
  <li>Claude Code installed and signed in with a Claude subscription. The 5-hour and 7-day windows are subscription limits.</li>
</ul>

<h2>Steps</h2>
<ol>
  <li><strong>Install motomotos.</strong> Open Motomotos.dmg, drag Motomotos into Applications and open it.</li>
  <li><strong>Open settings.</strong> Click the motomotos icon in the menu bar and choose <strong>Settings…</strong></li>
  <li><strong>Check Claude Code.</strong> Go to <strong>AI Tools</strong> and check Claude Code. You can check several tools; the island shows every one you check, and the closed island shows the first one’s percentage.</li>
  <li><strong>Connect Claude Code.</strong> Under <strong>Checked quotas</strong>, click <strong>Connect Claude Code</strong>. motomotos adds a <code>statusLine</code> entry to <code>~/.claude/settings.json</code>, backing the file up first. If you already use another status line, motomotos leaves it alone and doesn’t connect.</li>
  <li><strong>Use Claude Code once.</strong> Run <code>claude</code> in a terminal — the quota card’s <strong>Open in Terminal</strong> button does it for you. Claude Code only hands its limits to the status line during a session, so the numbers appear after that.</li>
  <li><strong>Look at the notch.</strong> Rest the pointer on the notch for a glance, or click to open it. The AI quota card shows the 5-hour and 7-day percentages and when each window resets.</li>
</ol>

<h2>How it works</h2>
<p>Claude Code passes its <code>rate_limits</code> — how much of the 5-hour and 7-day windows you have used — only to the status line command. motomotos’s status line command shows the model and both percentages in Claude Code’s status line, and copies those two numbers to a file on your Mac. motomotos reads only that file. It doesn’t read, store or forward any keys or tokens.</p>

<h2>Undo it</h2>
<p>Settings › AI Tools › <strong>Disconnect</strong> removes motomotos’s status line from <code>~/.claude/settings.json</code> and nothing else.</p>

<h2>If something looks wrong</h2>
<ul>
  <li><strong>“Connect Claude Code” is greyed out.</strong> Claude Code isn’t installed, or another status line is already set in <code>~/.claude/settings.json</code>.</li>
  <li><strong>No numbers yet.</strong> Use <code>claude</code> in a terminal once after connecting.</li>
  <li><strong>“Read, but the data is a bit old.”</strong> The last numbers are from a while ago. They refresh the next time you use Claude Code.</li>
</ul>

<h2>Codex and Grok, too</h2>
<p>Check Codex or Grok CLI in AI Tools as well. Their usage comes from the tools’ own data, with no extra setup. Whatever can’t be read shows as unavailable — motomotos never makes up a number.</p>
${cta}`,
    related: [
      ['Get notified when Claude Code or Codex finishes or needs approval', '/guides/ai-agent-alerts-in-notch/'],
      ['Dynamic Island apps for Mac, compared', '/compare/'],
    ],
  },

  {
    path: '/guides/ai-agent-alerts-in-notch/',
    nav: 'guides',
    type: 'TechArticle',
    title: 'Get notified in the Mac notch when Claude Code or Codex finishes, fails or needs approval',
    desc: 'Stop checking the terminal. motomotos lights up the MacBook notch when Claude Code, Codex, Grok and other AI agents finish, fail or wait for approval, and one click takes you back. Any other tool can send an alert with motomotos notify.',
    h1: 'Get notified when Claude Code or Codex finishes, fails or needs approval',
    lead: 'Long agent runs finish while you’re in another window. motomotos lights up your MacBook’s notch the moment an agent is done, fails or waits for you — and one click takes you back to the right terminal.',
    published: '2026-11-19',
    updated: '2026-11-19',
    crumbs: [['Guides', '/guides/ai-agent-alerts-in-notch/'], ['AI agent alerts in the notch', '/guides/ai-agent-alerts-in-notch/']],
    body: `
<h2>Agents it follows</h2>
<p>Claude Code, Codex (the CLI and the desktop app), Grok CLI, DeepSeek Harness, Hermes and WorkBuddy. In <strong>Settings › Terminals &amp; Approval</strong>, each agent has one switch that covers both its desktop app and its terminal command. Every open session gets a row with its own icon; click a row to jump back to its terminal.</p>

<h2>Set up</h2>
<ol>
  <li><a href="${DL}">Install motomotos</a> and open it. The welcome steps find the agents on your Mac and send a test alert.</li>
  <li><strong>Claude Code:</strong> in Settings › Terminals &amp; Approval › <strong>Claude Code hooks</strong>, click <strong>Install</strong>. It’s optional — without it you still see Claude Code working; with it, the notch also tells you when Claude Code waits for your approval. motomotos only adds its own entries to the hooks in <code>~/.claude/settings.json</code> (backing the file up first) and leaves your other settings alone. Restart open Claude Code sessions afterwards. <strong>Uninstall</strong> removes only those entries.</li>
  <li><strong>Grok CLI:</strong> install the Grok CLI hook on the same page.</li>
  <li><strong>Codex and Hermes</strong> need nothing else — turn on their switches.</li>
</ol>

<h2>What you see</h2>
<div class="tbl"><table>
  <tr><th>Done</th><td>A tick draws itself, sparks burst out, the cat is happy.</td></tr>
  <tr><th>Error</th><td>A red alert and a short shake of the head.</td></tr>
  <tr><th>Waiting for you</th><td>The island grows into a card with the exact command, with amber light underneath.</td></tr>
</table></div>
<p>Each kind of alert has its own sound, and you can turn off the pop-up banner in Settings › Appearance while keeping the cat and the sound.</p>

<h2>Approve in the terminal or in the notch</h2>
<ul>
  <li><strong>Follow terminal</strong> (default): anything your terminal asks about is approved in the terminal. The island reminds you and jumps back to it.</li>
  <li><strong>Approve in the notch</strong>: sessions running with full access wait in the notch until you say OK.</li>
</ul>

<h2>Alerts from any other tool</h2>
<p>Gemini CLI, Aider, a long build, a backup script: the <code>motomotos</code> command lights up the island the same way.</p>
<pre><code># send one
motomotos notify --title "Build done" --status done --app "Gemini CLI"

# wrap a command: done or error by exit code, with the time it took
motomotos run -- make test

# from Shortcuts, Raycast or a browser extension
open "motomotos://notify?title=Done&amp;status=done&amp;app=Raycast"</code></pre>
<p><code>--status</code> is <code>done</code>, <code>error</code>, <code>waiting</code> or <code>info</code>. The link only shows an alert; it never runs anything. If motomotos isn’t running, no alert is sent and nothing breaks; <code>run</code> always exits with your command’s own exit code.</p>
${cta}`,
    related: [
      ['How to see Claude Code usage limits in your MacBook notch', '/guides/claude-code-usage-in-notch/'],
      ['Dynamic Island apps for Mac, compared', '/compare/'],
    ],
  },

  {
    path: '/changelog/',
    nav: 'changelog',
    type: 'WebPage',
    title: 'motomotos changelog — what’s new in the Dynamic Island for Mac',
    desc: 'Release notes for motomotos, the Dynamic Island app for the Mac notch. Latest: 1.1.2 (November 20, 2026): buying inside the app, clearer trial rules, local date and time formats, and fixes.',
    h1: 'Changelog',
    lead: 'What changed in each version of motomotos. To update, use Settings › General › Check for Updates in the app, or download the latest version any time.',
    published: '2026-10-24',
    updated: '2026-11-19',
    crumbs: [['Changelog', '/changelog/']],
    body: `
<section class="release">
  <h2>1.1.2 <time datetime="2026-11-20">November 20, 2026</time></h2>
  <ul>
    <li><strong>Buy inside the app.</strong> A new purchase window: pay with Creem and this Mac unlocks on its own. Waiting, success, timeout and cancel each have their own screen. Activation codes are gone; a license key from your receipt email goes under <strong>Restore Purchase</strong>.</li>
    <li><strong>Clear trial rules.</strong> After the 10-day trial the AI agent features and the other widgets lock until you buy; the island, the clock and the cat keep working. A paid Mac no longer locks when the license server can’t be reached.</li>
    <li><strong>Feels local.</strong> Dates and times follow your Mac’s region, 12/24-hour setting and time zone; new installs pick °F / mph from your measurement system; permission prompts are translated into all six languages; update notices no longer pop up a dialog at launch.</li>
    <li><strong>The island closes when you leave it</strong> by default, and only one copy of motomotos can run at a time.</li>
    <li><strong>Lighter and steadier.</strong> Less CPU when idle, faster drawing while the island opens, a music helper that checks less often and quits with the app, and Reminders sync that never deletes your local to-dos when it can’t read the list.</li>
  </ul>
</section>
<section class="release">
  <h2>1.1.0 <time datetime="2026-11-13">November 13, 2026</time></h2>
  <ul>
    <li><strong>Redesigned settings</strong>, an improved island layout, background previews, and smoother opening and closing.</li>
    <li><strong>Notarized by Apple.</strong> Motomotos.dmg is signed with a Developer ID and notarized: open it and drag Motomotos into Applications, with no “can’t be verified” warning.</li>
  </ul>
</section>
<section class="release">
  <h2>1.0.5 <time datetime="2026-10-28">October 28, 2026</time></h2>
  <ul>
    <li><strong>Pay and it unlocks — no key.</strong> Settings › Account › Buy for $4.99: pay in the browser and this Mac unlocks on its own a moment later. Keys bought on the website before still work, on up to 3 Macs.</li>
    <li>The Buy button on motomotos.com opens the app to buy, so paying on the site unlocks your Mac the same way.</li>
  </ul>
</section>
<section class="release">
  <h2>1.0.4 <time datetime="2026-10-27">October 27, 2026</time></h2>
  <ul>
    <li><strong>Redesigned island.</strong> Springy opening and closing; the rim glows with what’s going on. Done and error alerts redrawn: a tick that draws itself with sparks, a shake of the head on errors.</li>
    <li><strong>Hover band.</strong> Rest on the notch for running sessions, AI usage left, now playing, the clock and the focus timer; click to open.</li>
    <li><strong>Music in the notch.</strong> Cover art and an equalizer; while an agent works and a song plays, the island pinches off a small drop for the music.</li>
    <li><strong>More AI agents:</strong> Claude Code, Codex, Grok, DeepSeek Harness, Hermes and WorkBuddy, desktop apps and terminals, one switch each.</li>
    <li><strong>AI usage left</strong> for every agent, with the exact reset day and time.</li>
    <li><strong>Pomodoro</strong> with an alert in the notch when time is up.</li>
    <li>Requires macOS 15 or later. After updating, turn Screen Recording and Automation back on for motomotos in System Settings › Privacy &amp; Security.</li>
  </ul>
</section>
<section class="release">
  <h2>1.0.3 <time datetime="2026-10-25">October 25, 2026</time></h2>
  <ul>
    <li>Activation codes bought on the website can be redeemed in Settings › Account, on up to 3 Macs.</li>
  </ul>
</section>
<section class="release">
  <h2>1.0.2 <time datetime="2026-10-25">October 25, 2026</time></h2>
  <ul>
    <li><strong>Claude Code alerts.</strong> One click in Terminals &amp; Approval, and the island lights up when Claude Code finishes, fails or waits for you.</li>
    <li><strong>Alerts from any tool:</strong> <code>motomotos notify</code>, <code>motomotos run -- &lt;command&gt;</code> and <code>motomotos://notify</code> links.</li>
    <li><strong>Agents connected on first launch:</strong> the welcome steps find Grok CLI, Claude Code, Codex and Hermes and send a test alert.</li>
  </ul>
</section>
<section class="release">
  <h2>1.0.1 <time datetime="2026-10-24">October 24, 2026</time></h2>
  <ul>
    <li>Session status and approvals work on a fresh install.</li>
    <li>No more approving twice: <strong>Follow terminal</strong> (default) or <strong>Approve in the notch</strong>.</li>
    <li>The island shows with the lid closed on an external display, and on Macs without a notch.</li>
    <li>The 10-day trial, then a $4.99 license that keeps every feature.</li>
  </ul>
</section>
${cta}`,
    related: [
      ['Dynamic Island apps for Mac, compared', '/compare/'],
      ['How to see Claude Code usage limits in your MacBook notch', '/guides/claude-code-usage-in-notch/'],
    ],
  },
];

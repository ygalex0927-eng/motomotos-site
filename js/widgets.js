// Widget cards drawn in HTML (no screenshots): crisp at any size, in the page's language, and they work.
// buildWidgets(host, T, lang, hooks) — hooks.onFocusDone() / hooks.onMusic(playing) let the hero island react.

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pad2 = (n) => String(n).padStart(2, '0');

export function quotaCard(T) {
  const rows = [['Claude Code', '#D97757', 20, T['wd.q.r1']], ['Grok', '#E6E6E6', 36, T['wd.q.r2']], ['Codex', '#10A37F', 90, T['wd.q.r3']]];
  const ink = (left) => (left <= 20 ? '#FFB020' : '#F4F2EE');
  return `<div class="wd wd-quota">
  <div class="wd-h"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M8 8l3-2"/></svg>${esc(T['wd.q.title'])}</div>
  ${rows.map(([n, c, left, reset]) => `<div class="wq-row">
    <div class="wq-top"><span class="wq-dot" style="--c:${c}"></span><b>${n}</b><span class="wq-pct" style="color:${ink(left)}">${esc(T['wd.q.left'].replace('%d', left))}</span></div>
    <div class="wq-bar"><i style="width:${left}%;background:${ink(left)}"></i></div>
    <div class="wq-meta">${esc(T['wd.q.week'])} · ${esc(reset)}</div>
  </div>`).join('')}
</div>`;
}

export function buildWidgets(host, T, lang, hooks = {}) {
  const now = new Date();
  const locale = lang === 'zh' ? 'zh-CN' : 'en-US';
  host.innerHTML = `
<article class="wcard live"><div class="wbox">${quotaCard(T)}</div><div class="txt"><h3>${esc(T['wg.usage.h'])}</h3><p>${esc(T['wg.usage.p'])}</p></div></article>

<article class="wcard live"><div class="wbox"><div class="wd wd-pomo" id="wdPomo">
  <svg class="wp-ring" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="50" class="trk"/><circle cx="60" cy="60" r="50" class="arc" id="wpArc" stroke-dasharray="314.2" stroke-dashoffset="314.2"/></svg>
  <div class="wp-time mono" id="wpTime">25:00</div>
  <div class="wp-sub" id="wpSub">${esc(T['wd.p.focus'])} · 25 ${esc(T['wd.p.min'])}</div>
  <div class="wp-ctl"><button type="button" id="wpMinus" aria-label="−">−</button><button type="button" class="play" id="wpPlay" aria-label="start">▶</button><button type="button" id="wpPlus" aria-label="+">+</button></div>
</div></div><div class="txt"><h3>${esc(T['wg.pomodoro.h'])}</h3><p>${esc(T['wd.p.try'])}</p></div></article>

<article class="wcard live"><div class="wbox"><div class="wd wd-cal">${calendar(now, locale)}</div></div><div class="txt"><h3>${esc(T['wg.clock.h'])}</h3><p>${esc(T['wg.clock.p'])}</p></div></article>

<article class="wcard live"><div class="wbox"><div class="wd wd-music" id="wdMusic">
  <div class="wm-cover"><i></i></div>
  <div class="wm-title">${esc(T['wd.m.song'])}</div><div class="wm-artist">${esc(T['wd.m.artist'])}</div>
  <div class="wm-bar"><i id="wmProg"></i></div>
  <div class="wm-ctl"><button type="button" aria-label="previous">⏮</button><button type="button" class="play" id="wmPlay" aria-label="play">▶</button><button type="button" aria-label="next">⏭</button></div>
</div></div><div class="txt"><h3>${esc(T['wd.m.h'])}</h3><p>${esc(T['wd.m.p'])}</p></div></article>

<article class="wcard live"><div class="wbox"><div class="wd wd-batt" id="wdBatt">
  <div class="wd-h"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1.5" y="5" width="11" height="6" rx="1.5"/><path d="M14 7v2"/></svg>${esc(T['wg.battery.h'])}</div>
  <svg class="wb-ring" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="48" class="trk"/><circle cx="60" cy="60" r="48" class="arc" id="wbArc" stroke-dasharray="301.6" stroke-dashoffset="57"/></svg>
  <div class="wb-pct"><b id="wbPct">81</b><span>%</span></div>
  <div class="wb-left" id="wbLeft">${esc(T['wd.b.left'])}</div>
</div></div><div class="txt"><h3>${esc(T['wg.battery.h'])}</h3><p>${esc(T['wg.battery.p'])}</p></div></article>

<article class="wcard live"><div class="wbox"><div class="wd wd-tok">
  <div class="wd-h"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2l1.4 3.6L13 7l-3.6 1.4L8 12l-1.4-3.6L3 7l3.6-1.4z"/></svg>${esc(T['wd.t.title'])}<span class="r">${esc(T['wd.t.range'])}</span></div>
  <div class="wt-big">279M</div>
  <div class="wt-hist">${[6, 10, 4, 16, 28, 14, 8, 3, 5, 22, 34, 26, 18, 9, 30, 44, 24, 38].map((h, i, a) => `<i style="height:${h}px"${i === a.length - 1 ? ' class="hot"' : ''}></i>`).join('')}</div>
  ${[['Opus', 64], ['GPT', 22], ['Grok', 14]].map(([n, p]) => `<div class="wt-row"><span>${n}</span><b>${p}%</b></div><div class="wt-bar"><i style="width:${p}%"></i></div>`).join('')}
</div></div><div class="txt"><h3>${esc(T['wg.tokenuse.h'])}</h3><p>${esc(T['wg.tokenuse.p'])}</p></div></article>

<article class="wcard live"><div class="wbox"><div class="wd wd-apps">${['Terminal', 'Safari', 'Music', 'Finder', 'Notes', 'Mail', 'Photos', 'Calendar', 'Xcode'].map((n, i) => `<button type="button" class="wa" style="--h:${(i * 40) % 360}"><span>${n.slice(0, 1)}</span><em>${n}</em></button>`).join('')}</div></div><div class="txt"><h3>${esc(T['wd.a.h'])}</h3><p>${esc(T['wd.a.p'])}</p></div></article>

<article class="wcard text"><div><span class="big">${esc(T['wg.more.big'])}</span> <span style="font-size:20px;font-weight:600">${esc(T['wg.more.h'])}</span></div><p style="color:var(--ink2);margin:10px 0 0">${esc(T['wg.more.p'])}</p><div class="tags">${T['wg.tags'].map((t) => `<span>${esc(t)}</span>`).join('')}</div></article>`;

  // ---- pomodoro: a real countdown (one simulated minute per second, so the end is reachable) ----
  let mins = 25, left = 0, total = 0, timer = null;
  const $ = (id) => host.querySelector('#' + id);
  const arc = $('wpArc'), time = $('wpTime'), sub = $('wpSub'), play = $('wpPlay');
  const show = () => {
    const s = timer || left ? left : mins * 60;
    time.textContent = `${pad2(Math.floor(s / 60))}:${pad2(s % 60)}`;
    arc.style.strokeDashoffset = String(314.2 * (total ? left / total : 1));
    sub.textContent = timer ? T['wd.p.running'] : (left ? T['wd.p.paused'] : `${T['wd.p.focus']} · ${mins} ${T['wd.p.min']}`);
    play.textContent = timer ? '❚❚' : '▶';
    $('wpMinus').disabled = $('wpPlus').disabled = !!(timer || left);
  };
  $('wpMinus').onclick = () => { mins = Math.max(1, mins <= 5 ? mins - 1 : mins - 5); show(); };
  $('wpPlus').onclick = () => { mins = Math.min(180, mins < 5 ? mins + 1 : mins + 5); show(); };
  play.onclick = () => {
    if (timer) { clearInterval(timer); timer = null; show(); return; }
    if (!left) { total = left = mins * 60; }
    timer = setInterval(() => {
      left = Math.max(0, left - 60);
      if (left === 0) {
        clearInterval(timer); timer = null; total = 0; show();
        if (hooks.onFocusDone) hooks.onFocusDone();
        return;
      }
      show();
    }, 1000);
    show();
  };
  show();

  // ---- music: play / pause drives the cover's equalizer and the hero island ----
  let playing = false, prog = 0.32, mt = null;
  const mplay = $('wmPlay'), mbox = $('wdMusic'), mprog = $('wmProg');
  mprog.style.width = `${prog * 100}%`;
  mplay.onclick = () => {
    playing = !playing;
    mplay.textContent = playing ? '❚❚' : '▶';
    mbox.classList.toggle('on', playing);
    clearInterval(mt);
    if (playing) mt = setInterval(() => { prog = (prog + 0.004) % 1; mprog.style.width = `${prog * 100}%`; }, 250);
    if (hooks.onMusic) hooks.onMusic(playing);
  };

  // ---- battery: the visitor's own, when the browser tells ----
  if (navigator.getBattery) {
    navigator.getBattery().then((b) => {
      const pct = Math.round(b.level * 100);
      $('wbPct').textContent = pct;
      $('wbArc').style.strokeDashoffset = String(301.6 * (1 - b.level));
      $('wdBatt').classList.toggle('low', pct <= 20);
      $('wbLeft').textContent = b.charging ? T['wd.b.charging'] : T['wd.b.yours'];
    }).catch(() => {});
  }

  // ---- launcher: a press, like the app ----
  host.querySelectorAll('.wa').forEach((b) => b.addEventListener('click', () => { b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); }));
}

function calendar(now, locale) {
  const y = now.getFullYear(), m = now.getMonth(), today = now.getDate();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const head = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long' }).format(now);
  const wk = [...Array(7)].map((_, i) => new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(new Date(2026, 0, 4 + i)));
  const cells = [...Array(first)].map(() => '<span></span>').concat([...Array(days)].map((_, i) => `<span${i + 1 === today ? ' class="today"' : ''}>${i + 1}</span>`));
  const clock = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
  return `<div class="wc-head"><b>${esc(head)}</b><span class="mono">${clock}</span></div><div class="wc-grid wk">${wk.map((d) => `<span>${esc(d)}</span>`).join('')}</div><div class="wc-grid">${cells.join('')}</div>`;
}

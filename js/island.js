// The live island on the page: one black shape that morphs between the app's states (motomotos 2.0 mockup).
// new Island(host, { lang, fixed }) — fixed: show one state only (the mini stages); otherwise call .go(state).

const SHAPE = 'linear(0, 0.0403, 0.1412, 0.2767, 0.4259, 0.5734, 0.7084, 0.8245, 0.9187, 0.9904, 1.0410, 1.0731, 1.0899, 1.0948, 1.0910, 1.0814, 1.0686, 1.0544, 1.0404, 1.0276, 1.0166, 1.0077, 1.0009, 0.9961, 0.9931, 0.9915, 0.9910, 0.9914, 0.9923, 0.9935, 0.9948, 0.9962, 0.9974, 0.9984, 0.9993, 0.9999, 1.0004, 1.0007, 1.0008, 1.0009, 1)';
const SPR = 'linear(0, 0.0419, 0.1416, 0.2692, 0.4039, 0.5325, 0.6475, 0.7452, 0.8248, 0.8871, 0.9340, 0.9678, 0.9910, 1.0060, 1.0146, 1.0188, 1.0199, 1.0191, 1.0171, 1.0145, 1.0118, 1.0093, 1.0070, 1.0050, 1.0035, 1.0022, 1.0013, 1.0006, 1.0002, 0.9999, 0.9997, 0.9996, 0.9996, 0.9996, 0.9997, 0.9997, 1)';
const D = '1s';

// Island size per state (w, h, bottom radius) and where the cat sits (x, y, height). Stage units: 1 = 0.5 pt.
export const GEO = {
  idle:     { w: 420,  h: 64,  r: 26, cat: [18, 9, 46] },
  working:  { w: 540,  h: 64,  r: 26, cat: [18, 9, 46] },
  split:    { w: 480,  h: 64,  r: 26, cat: [18, 9, 46] },
  music:    { w: 520,  h: 64,  r: 26, cat: [18, 9, 46] },
  done:     { w: 660,  h: 124, r: 46, cat: [26, 30, 64] },
  error:    { w: 640,  h: 124, r: 46, cat: [26, 30, 64] },
  focus:    { w: 640,  h: 124, r: 46, cat: [26, 30, 64] },
  waiting:  { w: 760,  h: 318, r: 50, cat: [26, 24, 60] },
  band:     { w: 1000, h: 148, r: 54, cat: [24, 38, 72] },
  expanded: { w: 1120, h: 598, r: 60, cat: [84, 38, 72] },
};
const POSE = { idle: 'fishing', band: 'fishing', expanded: 'busy', working: 'working', split: 'music', waiting: 'waiting', done: 'happy', music: 'music', error: 'error', focus: 'focusing' };
const POSES = ['fishing', 'working', 'busy', 'happy', 'waiting', 'error', 'music', 'focusing'];

const TXT = {
  zh: {
    idle: '摸鱼中', agent: 'Claude Code', running: '2 个在跑', waitingN: '1 个等你批准',
    doneT: 'Claude Code 做完了', doneS: 'my-app · 用时 4 分 12 秒', view: '查看',
    errT: 'Codex 出错了', errS: 'npm test · 3 个用例没通过', back: '跳回终端',
    focusT: '番茄钟', focusS: '专注完成，休息一下',
    waitT: 'Codex 想运行一条命令', waitS: 'website · 完全访问会话', waitTag: '等你批准',
    code: ['$ npm run build', '$ rsync -av dist/ server:/var/www/site', '# 会覆盖线上 3 个文件'],
    deny: '拒绝', ok: '批准', jump: '跳回终端 →',
    left: '剩余 64%', quotaName: 'Codex 5 小时', reset: '今天 15:18 重置',
    song: '海边的午后', artist: 'Lo-fi Studio', clock: '18:42', day: '周一 · 晴 18°', focus: '专注中',
    sessions: '会话', tokens: 'Token · 24 小时', battery: '还能用 2:06', weekday: '周一', date: '26', event: '19:30 · 周会回顾', lunar: '九月十七',
    rows: [['C', 'my-app', '跑测试 · 12 / 40', 'run', '4:12'], ['X', 'website', 'npm run build && rsync dist/', 'wait', '0:38'], ['G', 'notes', '写好交接记录', 'done', '刚刚'], ['D', 'api-server', '读代码 · 6 个文件', 'run', '1:05']],
    state: { run: '运行中', wait: '等你批准', done: '完成' },
  },
  en: {
    idle: 'Slacking', agent: 'Claude Code', running: '2 running', waitingN: '1 needs you',
    doneT: 'Claude Code is done', doneS: 'my-app · took 4 min 12 s', view: 'View',
    errT: 'Codex hit an error', errS: 'npm test · 3 tests failed', back: 'Back to terminal',
    focusT: 'Pomodoro', focusS: 'Focus done — take a break',
    waitT: 'Codex wants to run a command', waitS: 'website · full-access session', waitTag: 'Needs you',
    code: ['$ npm run build', '$ rsync -av dist/ server:/var/www/site', '# overwrites 3 live files'],
    deny: 'Deny', ok: 'Approve', jump: 'Back to terminal →',
    left: '64% left', quotaName: 'Codex 5-hour', reset: 'resets today 15:18',
    song: 'Afternoon by the Sea', artist: 'Lo-fi Studio', clock: '18:42', day: 'Mon · Sunny 18°', focus: 'Focusing',
    sessions: 'Sessions', tokens: 'Tokens · 24 h', battery: '2:06 left', weekday: 'MON', date: '26', event: '19:30 · Weekly review', lunar: 'October',
    rows: [['C', 'my-app', 'Running tests · 12 / 40', 'run', '4:12'], ['X', 'website', 'npm run build && rsync dist/', 'wait', '0:38'], ['G', 'notes', 'Wrote the handoff', 'done', 'now'], ['D', 'api-server', 'Reading code · 6 files', 'run', '1:05']],
    state: { run: 'Running', wait: 'Needs you', done: 'Done' },
  },
};

const SPARKS = (() => {
  const out = [];
  const colors = ['#5BE584', '#FFFFFF', '#FFD60A', '#B7F5C8'];
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2 + (i % 3) * 0.17;
    const d = 46 + ((i * 37) % 60);
    out.push([Math.round(Math.cos(a) * d * 1.3), Math.round(Math.sin(a) * d * 0.9), 3 + (i % 3), colors[i % 4], 0.7 + (i % 5) * 0.08, (i % 4) * 0.025]);
  }
  return out;
})();
const HIST = [8, 12, 6, 20, 34, 18, 10, 4, 6, 26, 40, 30, 22, 12, 36, 52, 28, 44];
const APPS = ['M4 17l6-6-6-6M12 19h8', 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18', 'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0a3 3 0 1 1 6 0M21 16a3 3 0 1 1-6 0a3 3 0 1 1 6 0', 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z', 'M12 8v4l3 2M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18'];

const fade = (on, delay) => on
  ? `opacity:1;filter:blur(0);transform:translateY(0);transition:opacity .34s ease ${delay}ms,filter .34s ease ${delay}ms,transform .6s ${SPR} ${delay}ms`
  : 'opacity:0;filter:blur(8px);transform:translateY(-6px);transition:opacity .14s ease,filter .14s ease,transform .14s ease;pointer-events:none';
const rise = (on, delay) => on ? `transform:translateY(0%);transition:transform .62s ${SPR} ${delay}ms` : 'transform:translateY(115%);transition:transform .14s ease';
const ring = (frac, circ, on, delay) => `stroke-dashoffset:${(on ? circ * (1 - frac) : circ).toFixed(1)};transition:stroke-dashoffset ${on ? `1.1s ${SPR} ${delay}ms` : '.1s'}`;
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

export class Island {
  constructor(host, { lang = 'zh', catBase = '/assets/v2/cat/', state = 'idle' } = {}) {
    this.host = host;
    this.lang = lang;
    this.catBase = catBase;
    this.s = state;
    this.build();
    this.render();
  }

  setLang(lang) { this.lang = lang; this.build(); this.render(); }

  go(state) {
    if (!GEO[state] || state === this.s) return;
    this.s = state;
    this.render();
  }

  // ---- DOM ---------------------------------------------------------------
  build() {
    const t = TXT[this.lang] || TXT.zh;
    const tone = { run: '#4DA3FF', wait: '#FFB020', done: '#34C759' };
    const bars = (cls) => [0, 1, 2, 3, 4].map((i) => `<i class="${cls}" style="animation-duration:${(0.7 + i * 0.09).toFixed(2)}s;animation-delay:${(i * 0.11).toFixed(2)}s"></i>`).join('');
    this.host.innerHTML = `
<div class="isl" data-s="idle">
  <div class="isl-glow" data-k="glow"></div>
  <div class="isl-bglow" data-k="bubbleGlow"></div>
  <div class="isl-goo" style="filter:url(#isl-goo)">
    <div class="isl-shape" data-k="shape"></div>
    <div class="isl-bshape" data-k="bubbleShape"></div>
  </div>
  <div class="isl-bubble" data-k="bubble">
    <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="30" r="22" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="3"/><circle cx="32" cy="30" r="22" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-dasharray="138.2" stroke-dashoffset="52" transform="rotate(-90 32 30)"/></svg>
    <div class="cover sm"><i></i></div>
  </div>
  <div class="isl-sparks" data-k="sparks">${SPARKS.map((p) => `<span style="width:${p[2]}px;height:${p[2]}px;margin:${-p[2] / 2}px 0 0 ${-p[2] / 2}px;background:${p[3]};box-shadow:0 0 ${p[2] * 2}px ${p[3]};--dx:${p[0]}px;--dy:${p[1]}px;--dur:${p[4].toFixed(2)}s;--del:${(0.78 + p[5]).toFixed(3)}s"></span>`).join('')}<b data-k="shock"></b></div>
  <div class="isl-body" data-k="island">
    <div class="isl-sweep" data-k="sweep"></div>
    <div class="isl-cat" data-k="cat">${POSES.map((p) => `<img src="${this.catBase}${p}.webp" alt="" data-pose="${p}">`).join('')}</div>
    <div class="ear" data-k="idleEar"><span class="dim">${esc(t.idle)}</span></div>
    <div class="ear" data-k="workEar"><svg class="spin" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="2"/><path d="M8 1.5 A6.5 6.5 0 0 1 14.5 8" fill="none" stroke="#7DB8FF" stroke-width="2" stroke-linecap="round"/></svg><span class="mid">${esc(t.agent)}</span><span class="mono strong" data-k="elapsed">2:41</span></div>
    <div class="ear" data-k="musicEar"><div class="cover glow"><i></i></div><div class="wave">${bars('w')}</div></div>
    <div class="fill" data-k="done">
      <svg class="mark ok" width="44" height="44" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" fill="none" stroke="#34C759" stroke-width="2.5" data-k="doneRing"/><path d="M13.5 22.5 l6 6 l11 -12.5" fill="none" stroke="#34C759" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-k="doneTick"/></svg>
      <div class="ln l1"><div data-k="rise1">${esc(t.doneT)}</div></div><div class="ln l2"><div data-k="rise2">${esc(t.doneS)}</div></div>
      <div class="pill" data-k="pillDone">${esc(t.view)}</div>
    </div>
    <div class="fill" data-k="focusN">
      <svg class="mark ok" width="44" height="44" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" fill="none" stroke="#FF6A55" stroke-width="2.5"/><path d="M22 12v10l6 4" fill="none" stroke="#FF6A55" stroke-width="3" stroke-linecap="round"/></svg>
      <div class="ln l1"><div data-k="rise1f">${esc(t.focusT)}</div></div><div class="ln l2"><div data-k="rise2f">${esc(t.focusS)}</div></div>
    </div>
    <div class="fill" data-k="error">
      <svg class="mark bad" width="44" height="44" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" fill="none" stroke="#FF453A" stroke-width="2.5"/><path d="M15.5 15.5 l13 13 M28.5 15.5 l-13 13" fill="none" stroke="#FF453A" stroke-width="3" stroke-linecap="round"/></svg>
      <div class="ln l1"><div data-k="rise1e">${esc(t.errT)}</div></div><div class="ln l2"><div data-k="rise2e">${esc(t.errS)}</div></div>
      <div class="pill" data-k="pillError">${esc(t.back)}</div>
    </div>
    <div class="fill" data-k="waiting">
      <div class="ln w1"><div data-k="rise1w">${esc(t.waitT)}</div></div><div class="ln w2"><div data-k="rise2w">${esc(t.waitS)}</div></div>
      <div class="wtag"><i></i><span>${esc(t.waitTag)}</span></div>
      <div class="code mono" data-k="code"><div>${esc(t.code[0])}</div><div class="c2">${esc(t.code[1])}</div><div class="c3">${esc(t.code[2])}</div></div>
      <div class="acts" data-k="actions"><span class="dim">${esc(t.jump)}</span><div><span class="b">${esc(t.deny)}</span><span class="b ok">${esc(t.ok)}</span></div></div>
    </div>
    <div class="band" data-k="band">
      <div class="m m1" data-k="m1"><div class="t1">${esc(t.running)}</div><div class="t2 amber">${esc(t.waitingN)}</div><div class="coins"><span>C</span><span>X</span><span>D</span></div></div>
      <div class="sep" style="left:250px"></div>
      <div class="m m2 row" data-k="m2"><svg width="58" height="58" viewBox="0 0 58 58" aria-hidden="true"><circle cx="29" cy="29" r="24" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="6"/><circle cx="29" cy="29" r="24" fill="none" stroke="url(#isl-q)" stroke-width="6" stroke-linecap="round" stroke-dasharray="150.8" transform="rotate(-90 29 29)" data-k="ringQ"/></svg><div><div class="big">${esc(t.left)}</div><div class="t3">${esc(t.quotaName)}</div><div class="t4">${esc(t.reset)}</div></div></div>
      <div class="sep" style="left:448px"></div>
      <div class="m m3 row" data-k="m3"><div class="cover lg"><i></i></div><div><div class="song">${esc(t.song)}</div><div class="t3">${esc(t.artist)}</div><div class="wave sm">${bars('w')}</div></div></div>
      <div class="sep" style="left:682px"></div>
      <div class="m m4" data-k="m4"><div class="clock">${esc(t.clock)}</div><div class="t3">${esc(t.day)}</div></div>
      <div class="sep" style="left:842px"></div>
      <div class="m m5" data-k="m5"><svg width="58" height="58" viewBox="0 0 58 58" aria-hidden="true"><circle cx="29" cy="29" r="24" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="6"/><circle cx="29" cy="29" r="24" fill="none" stroke="#FF6A55" stroke-width="6" stroke-linecap="round" stroke-dasharray="150.8" transform="rotate(-90 29 29)" data-k="ringP"/><text x="29" y="34" text-anchor="middle" font-size="14" font-weight="600" fill="#fff">24'</text></svg><div class="t3">${esc(t.focus)}</div></div>
    </div>
    <div class="lower" data-k="lower">
      <div class="hair"></div>
      <div class="cap">${esc(t.sessions)}</div>
      ${t.rows.map((r, i) => `<div class="srow" data-k="row${i}"><span class="mark">${r[0]}</span><div class="sx"><div class="p">${esc(r[1])}</div><div class="st">${esc(r[2])}</div></div><span class="state" style="color:${tone[r[3]]};background:${tone[r[3]]}22;box-shadow:0 0 14px ${tone[r[3]]}33">${esc(t.state[r[3]])}</span><span class="tm mono">${esc(r[4])}</span></div>`).join('')}
      <div class="tile" style="left:620px;top:22px" data-k="t1"><div class="t3">${esc(t.tokens)}</div><div class="tbig">279M</div><div class="hist">${HIST.map((h, i) => `<i style="height:${h}px;transition-delay:${420 + i * 25}ms"${i === HIST.length - 1 ? ' class="hot"' : ''}></i>`).join('')}</div></div>
      <div class="tile center" style="left:840px;top:22px" data-k="t2"><svg width="84" height="84" viewBox="0 0 84 84" aria-hidden="true"><circle cx="42" cy="42" r="34" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="8"/><circle cx="42" cy="42" r="34" fill="none" stroke="#34C759" stroke-width="8" stroke-linecap="round" stroke-dasharray="213.6" transform="rotate(-90 42 42)" data-k="ringB"/><text x="42" y="48" text-anchor="middle" font-size="19" font-weight="600" fill="#fff">81%</text></svg><div class="t3" style="margin-top:12px">${esc(t.battery)}</div></div>
      <div class="tile" style="left:620px;top:222px" data-k="t3"><div class="red">${esc(t.weekday)}</div><div class="day">${esc(t.date)}</div><div class="t3" style="margin-top:10px">${esc(t.event)}</div><div class="t4">${esc(t.lunar)}</div></div>
      <div class="tile apps" style="left:840px;top:222px" data-k="t4">${APPS.map((d) => `<span><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg></span>`).join('')}</div>
    </div>
  </div>
</div>`;
    this.els = {};
    this.host.querySelectorAll('[data-k]').forEach((el) => { this.els[el.dataset.k] = el; el.dataset.base = el.getAttribute('style') || ''; });
    this.root = this.host.firstElementChild;
    this.cats = [...this.host.querySelectorAll('.isl-cat img')];
    this.hist = [...this.host.querySelectorAll('.hist i')];
  }

  // ---- styles per state ---------------------------------------------------
  render() {
    const s = this.s;
    const G = GEO[s];
    const on = (k) => (Array.isArray(k) ? k.includes(s) : s === k);
    const e = this.els;
    const set = (k, css) => { if (e[k]) e[k].style.cssText = css; };
    this.root.dataset.s = s;

    const geo = `width ${D} ${SHAPE},height ${D} ${SHAPE},border-radius ${D} ${SHAPE},margin-left ${D} ${SHAPE}`;
    const shake = s === 'error' ? 'animation:isl-shake .52s ease-out .5s 1;' : '';
    set('shape', `width:${G.w}px;height:${G.h + 40}px;margin-left:${-G.w / 2}px;border-radius:0 0 ${G.r}px ${G.r}px;transition:${geo};${shake}`);
    const split = s === 'split';
    const bl = split ? G.w / 2 + 16 : G.w / 2 - 70;
    set('bubbleShape', `margin-left:${bl}px;transition:margin-left .9s ${SHAPE} ${split ? 260 : 0}ms`);
    set('island', `width:${G.w}px;height:${G.h}px;margin-left:${-G.w / 2}px;border-radius:0 0 ${G.r}px ${G.r}px;transition:${geo};box-shadow:inset 0 -1px 0 rgba(255,255,255,${G.h > 100 ? '.09' : '.06'});${shake}`);

    const glows = {
      working: ['linear-gradient(90deg,#4DA3FF,#8B5CFF,#FF6AD5,#4DA3FF,#8B5CFF)', 'isl-flow 5s linear infinite', 0.85],
      split: ['linear-gradient(90deg,#4DA3FF,#8B5CFF,#FF6AD5,#4DA3FF,#8B5CFF)', 'isl-flow 5s linear infinite', 0.7],
      waiting: ['radial-gradient(closest-side,#FFB020,rgba(255,140,0,.6))', 'isl-breathe 1.8s ease-in-out infinite', 1],
      done: ['radial-gradient(closest-side,#5BE584,rgba(52,199,89,.6))', 'isl-flash 1.8s ease-out .5s 1 both', 1],
      focus: ['radial-gradient(closest-side,#FF8A75,rgba(255,106,85,.55))', 'isl-flash 1.8s ease-out .5s 1 both', 0.9],
      error: ['radial-gradient(closest-side,#FF6B60,rgba(255,69,58,.6))', 'isl-pulse 1.2s ease-out .45s 1 both', 1],
      music: ['radial-gradient(closest-side,#E8735A,rgba(217,103,78,.5))', 'isl-breathe 2.6s ease-in-out infinite', 0.6],
    };
    const g = glows[s];
    const big = G.h > 100;
    const gw = G.w + (big ? 40 : 20), gh = G.h + (big ? 30 : 26);
    set('glow', `width:${gw}px;height:${gh}px;margin-left:${-gw / 2}px;border-radius:0 0 ${G.r + 20}px ${G.r + 20}px;filter:blur(${big ? 34 : 18}px);background:${g ? g[0] : 'transparent'};background-size:300% 100%;opacity:${g ? g[2] : 0};animation:${g ? g[1] : 'none'};transition:width ${D} ${SHAPE},height ${D} ${SHAPE},margin-left ${D} ${SHAPE},opacity .5s ease`);
    set('bubbleGlow', `margin-left:${bl - 8}px;opacity:${split ? 0.55 : 0};transition:opacity .5s ease ${split ? 600 : 0}ms,margin-left .9s ${SHAPE} ${split ? 260 : 0}ms`);
    set('bubble', `margin-left:${bl}px;opacity:${split ? 1 : 0};filter:blur(${split ? 0 : 6}px);transition:margin-left .9s ${SHAPE} ${split ? 260 : 0}ms,opacity .3s ease ${split ? 700 : 0}ms,filter .3s ease ${split ? 700 : 0}ms`);

    // sparks + shock ring replay on every visit to 「做完了」 / 「番茄钟」
    const sparkOn = s === 'done' || s === 'focus';
    set('sparks', `margin-left:${-G.w / 2 + 150}px;transition:margin-left ${D} ${SHAPE}`);
    e.sparks.classList.remove('go'); void e.sparks.offsetWidth; if (sparkOn) e.sparks.classList.add('go');
    const sweepOn = on(['done', 'waiting', 'error', 'band', 'focus']);
    e.sweep.classList.remove('go'); void e.sweep.offsetWidth; if (sweepOn) e.sweep.classList.add('go');

    const C = G.cat;
    set('cat', `left:${C[0]}px;top:${C[1]}px;height:${C[2]}px;width:${Math.round(C[2] * 1.4)}px;transition:left ${D} ${SHAPE},top ${D} ${SHAPE},height ${D} ${SHAPE},width ${D} ${SHAPE}`);
    const pose = POSE[s];
    this.cats.forEach((img) => { const v = img.dataset.pose === pose; img.style.opacity = v ? 1 : 0; img.style.filter = `blur(${v ? 0 : 6}px)`; });

    set('idleEar', fade(s === 'idle', 160));
    set('workEar', fade(on(['working', 'split']), 220));
    set('musicEar', fade(s === 'music', 220));
    set('done', fade(s === 'done', 120));
    set('doneRing', `stroke-dasharray:126;stroke-dashoffset:${s === 'done' ? 0 : 126};transition:stroke-dashoffset ${s === 'done' ? '.55s ease-out .2s' : '.1s'}`);
    set('doneTick', `stroke-dasharray:32;stroke-dashoffset:${s === 'done' ? 0 : 32};transition:stroke-dashoffset ${s === 'done' ? '.3s ease-out .62s' : '.1s'}`);
    set('rise1', rise(s === 'done', 260)); set('rise2', rise(s === 'done', 330));
    set('pillDone', fade(s === 'done', 420));
    set('focusN', fade(s === 'focus', 120));
    set('rise1f', rise(s === 'focus', 260)); set('rise2f', rise(s === 'focus', 330));
    set('error', fade(s === 'error', 120));
    set('rise1e', rise(s === 'error', 260)); set('rise2e', rise(s === 'error', 330));
    set('pillError', fade(s === 'error', 420));
    set('waiting', fade(s === 'waiting', 140));
    set('rise1w', rise(s === 'waiting', 260)); set('rise2w', rise(s === 'waiting', 330));
    set('code', fade(s === 'waiting', 380));
    set('actions', fade(s === 'waiting', 470));
    set('band', fade(on(['band', 'expanded']), 60));
    [[112, 36, 130], [270, 44, 170], [468, 44, 200], [704, 40, 128], [866, 30, 90]].forEach((m, i) => {
      set(`m${i + 1}`, `left:${m[0]}px;top:${m[1]}px;width:${m[2]}px;${fade(on(['band', 'expanded']), 180 + i * 55)}`);
    });
    set('ringQ', ring(0.64, 150.8, on(['band', 'expanded']), 320));
    set('ringP', ring(0.58, 150.8, on(['band', 'expanded']), 520));
    set('ringB', ring(0.81, 213.6, s === 'expanded', 560));
    set('lower', fade(s === 'expanded', 200));
    for (let i = 0; i < 4; i++) set(`row${i}`, `top:${52 + i * 70}px;${fade(s === 'expanded', 280 + i * 60)}`);
    ['t1', 't2', 't3', 't4'].forEach((k, i) => { e[k].style.cssText = e[k].dataset.base + ';' + fade(s === 'expanded', 360 + i * 60); });
    this.hist.forEach((h) => { h.style.transform = `scaleY(${s === 'expanded' ? 1 : 0})`; });
  }
}

/** Plays the states in order, holding each for its time (ms). Returns a stop function. */
export function autoplay(island, seq, onStep) {
  let i = 0, timer = null, stopped = false;
  const step = () => {
    if (stopped) return;
    const [s, ms] = seq[i % seq.length];
    island.go(s);
    if (onStep) onStep(s, i % seq.length);
    i++;
    timer = setTimeout(step, ms);
  };
  step();
  return () => { stopped = true; clearTimeout(timer); };
}

/** The SVG filter + gradient the island uses; add once per page. */
export const ISLAND_DEFS = `<svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs>
<filter id="isl-goo" x="-20%" y="-20%" width="140%" height="160%"><feGaussianBlur in="SourceGraphic" stdDeviation="8"/><feColorMatrix mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -11"/></filter>
<linearGradient id="isl-q" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFD08A"/><stop offset="1" stop-color="#FF8A3D"/></linearGradient>
</defs></svg>`;

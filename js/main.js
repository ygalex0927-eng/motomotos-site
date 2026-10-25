import { copyFor, currentRegion, saveRegion, refineRegion, CREEM_BUY, INSTALL_CMD, INSTALL_CMD_HTTP } from './i18n.js?v=202610250132';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, k) => a + (b - a) * k;
const inv = (a, b, x) => clamp((x - a) / (b - a));
const eOut = (x) => 1 - Math.pow(1 - x, 3);
const eInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const eOutExpo = (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const G = '#35E07A', Y = '#F5C542', R = '#FF4D5A';

let region = currentRegion();
let T = copyFor(region);
const asset = (p) => `/${T.assets}/${p}`;

// ---------------- i18n ----------------
const MOODS = ['working', 'busy', 'waiting', 'fishing', 'music', 'sleeping', 'happy', 'error', 'eating', 'message', 'focusing'];
function applyCopy() {
  document.documentElement.lang = T.lang;
  document.title = T.title;
  $('meta[name="description"]').setAttribute('content', T.desc);
  $$('[data-t]').forEach((el) => { const v = T[el.dataset.t]; if (v !== undefined) el.textContent = v; });
  $$('[data-th]').forEach((el) => { const v = T[el.dataset.th]; if (v !== undefined) el.innerHTML = v; });
  $$('#lang [data-l]').forEach((s) => s.classList.toggle('on', s.dataset.l === region));
  $('#notchLang span').textContent = region === 'cn' ? 'English' : '中文';
  $('#priceNum').textContent = T['price.amount'];
  $('.pill-buy').innerHTML = `<span class="long">${T['nav.buy'].replace(T['price.amount'], '').replace(/[·\s]+$/, '').replace(/^[·\s]+/, '')} </span>${T['price.amount']}`;
  const buy = $('#buyBtn');
  if (region === 'cn') {
    buy.removeAttribute('href'); buy.removeAttribute('target'); buy.removeAttribute('rel');
    buy.setAttribute('aria-disabled', 'true'); buy.classList.remove('pay-ready');
  } else {
    buy.href = CREEM_BUY; buy.target = '_blank'; buy.rel = 'noopener';
    buy.removeAttribute('aria-disabled'); buy.classList.remove('pay-ready');
  }
  $$('img[data-src]').forEach((img) => { img.src = asset(img.dataset.src); });
  $('#qPill').src = asset('moods/busy.webp');
  $('#qCard').src = asset('ui/usage.webp');
  $('#httpCmd').textContent = INSTALL_CMD_HTTP;
  buildMoods(); buildFaq();
  setMood(currentMood, true);
  seq.load();
  termReset();
  setDiy(diyMode);
}

// ---------------- DIY background ----------------
let diyMode = 'still';
function setDiy(mode) {
  diyMode = mode;
  const still = $('#diyStill'), gif = $('#diyGif');
  if (!still || !gif) return;
  $$('[data-diy]').forEach((b) => { const on = b.dataset.diy === mode; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
  if (mode === 'gif') {
    const src = asset('bg/lava.mp4');
    if (gif.dataset.src !== src) { gif.dataset.src = src; gif.poster = asset('bg/lava-poster.webp'); gif.src = src; }
    gif.hidden = false; still.hidden = true; gif.play().catch(() => {});
  } else {
    gif.pause(); gif.hidden = true; still.hidden = false;
  }
}
$$('[data-diy]').forEach((b) => b.addEventListener('click', () => setDiy(b.dataset.diy)));

// ---------------- notch ----------------
const notch = $('#notch'), notchMood = $('#notchMood'), notchShape = $('#notchShape');
let currentMood = 'working', moodLock = null;
const moodCache = {};
function setMood(m, force) {
  if (moodLock && !force) m = moodLock;
  if (m === currentMood && !force && notchMood.src) return;
  currentMood = m;
  const src = asset(`moods/${m}.webp`);
  const img = moodCache[src] || (moodCache[src] = Object.assign(new Image(), { src }));
  const show = () => {
    notchMood.src = src;
    notchShape.style.setProperty('--nw', `${Math.round(img.naturalWidth / 3)}px`);
  };
  img.complete ? show() : (img.onload = show);
}
let closeTimer;
const canHover = matchMedia('(hover: hover)').matches;
if (canHover) {
  notch.addEventListener('mouseenter', () => { clearTimeout(closeTimer); notch.classList.add('open'); });
  notch.addEventListener('mouseleave', () => { closeTimer = setTimeout(() => notch.classList.remove('open'), 220); });
}
$$('#notchMenu a').forEach((a) => a.addEventListener('click', () => notch.classList.remove('open')));
// touch: tap the island to open it, tap outside to close
if (!canHover) {
  notchShape.addEventListener('click', (e) => { if (!e.target.closest('a')) notch.classList.toggle('open'); });
  document.addEventListener('click', (e) => { if (!notch.contains(e.target)) notch.classList.remove('open'); });
}

function toggleLang() {
  region = region === 'cn' ? 'overseas' : 'cn';
  saveRegion(region);
  T = copyFor(region);
  applyCopy();
}
$('#lang').addEventListener('click', toggleLang);
$('#notchLang').addEventListener('click', (e) => { e.preventDefault(); toggleLang(); notch.classList.remove('open'); });

// ---------------- intro: sparks trace the notch ----------------
const intro = $('#intro');
function runIntro() {
  const title = $('#heroTitle');
  if (reduced) { title.classList.add('in'); notchMood.style.opacity = 1; return; }
  notchMood.style.opacity = 0;
  const dpr = Math.min(2, devicePixelRatio || 1);
  const W = innerWidth, H = innerHeight;
  intro.width = W * dpr; intro.height = H * dpr;
  const c = intro.getContext('2d'); c.scale(dpr, dpr);
  const r = notchShape.getBoundingClientRect();
  const rad = 14, side = r.height - rad, arc = (Math.PI / 2) * rad, flat = r.width / 2 - rad, total = side + arc + flat;
  const at = (d, dir) => {
    const x0 = dir < 0 ? r.left : r.right;
    if (d <= side) return [x0, r.top + d];
    if (d <= side + arc) { const a = (d - side) / rad; return [x0 - dir * rad + dir * rad * Math.cos(a), r.top + side + rad * Math.sin(a)]; }
    return [x0 - dir * (rad + (d - side - arc)), r.bottom];
  };
  const t0 = performance.now();
  let titled = false;
  function frame(now) {
    const t = (now - t0) / 1000;
    c.clearRect(0, 0, W, H);
    c.globalCompositeOperation = 'lighter';
    const p = eInOut(inv(0.15, 0.9, t));
    const fadeTrail = 1 - inv(0.95, 1.5, t);
    for (const dir of [-1, 1]) {
      c.lineWidth = 1.6; c.lineCap = 'round';
      const steps = 60;
      for (let k = 1; k <= steps; k++) {
        const [x0, y0] = at(total * p * (k - 1) / steps, dir), [x1, y1] = at(total * p * k / steps, dir);
        c.strokeStyle = `rgba(215,228,255,${(0.1 + 0.6 * k / steps) * fadeTrail})`;
        c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke();
      }
      if (t < 0.92 && t > 0.08) {
        const [hx, hy] = at(total * p, dir);
        const g = c.createRadialGradient(hx, hy, 0, hx, hy, 22);
        g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.3, 'rgba(200,220,255,0.45)'); g.addColorStop(1, 'rgba(160,190,255,0)');
        c.fillStyle = g; c.beginPath(); c.arc(hx, hy, 22, 0, 7); c.fill();
      }
    }
    const fk = inv(0.9, 1.6, t);
    if (fk > 0 && fk < 1) {
      const cx = r.left + r.width / 2, cy = r.bottom;
      const g = c.createRadialGradient(cx, cy, 0, cx, cy, 380);
      g.addColorStop(0, `rgba(255,255,255,${0.85 * (1 - fk)})`); g.addColorStop(0.18, `rgba(190,215,255,${0.3 * (1 - fk)})`); g.addColorStop(1, 'rgba(120,150,255,0)');
      c.fillStyle = g; c.fillRect(cx - 380, cy - 380, 760, 760);
      const sw = W * 0.6 * eOutExpo(fk);
      const sg = c.createLinearGradient(cx - sw, 0, cx + sw, 0);
      sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(0.5, `rgba(255,255,255,${0.9 * (1 - fk)})`); sg.addColorStop(1, 'rgba(255,255,255,0)');
      c.fillStyle = sg; c.fillRect(cx - sw, cy - 1, sw * 2, 2);
    }
    notchMood.style.opacity = eOut(inv(0.95, 1.35, t));
    if (!titled && t > 1.0) { titled = true; title.classList.add('in'); notch.classList.add('glow'); setTimeout(() => notch.classList.remove('glow'), 1400); }
    if (t < 1.7) requestAnimationFrame(frame); else { c.clearRect(0, 0, W, H); intro.remove(); }
  }
  requestAnimationFrame(frame);
}

// stagger the hero words
$$('#heroTitle .w').forEach((w, i) => (w.style.transitionDelay = `${i * 0.09}s`));

// ---------------- reveal ----------------
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -12% 0px' });
$$('.reveal').forEach((el) => {
  const sibs = [...el.parentElement.children].filter((n) => n.classList.contains('reveal'));
  el.style.setProperty('--d', `${Math.min(sibs.indexOf(el), 6) * 0.08}s`);
  io.observe(el);
});

// ---------------- film ----------------
const film = $('#film'), frameEl = $('#filmFrame'), video = $('#filmVideo'), sound = $('#sound');
sound.addEventListener('click', () => {
  video.muted = !video.muted;
  if (!video.muted) { video.currentTime = 0; video.play(); }
  sound.classList.toggle('on', !video.muted);
  sound.lastElementChild.textContent = video.muted ? T['film.sound'] : T['film.mute'];
});
new IntersectionObserver(([e]) => { if (e.isIntersecting) video.play().catch(() => {}); else video.pause(); }, { threshold: 0.15 }).observe(film);

// ---------------- quota scene ----------------
const quota = $('#quota'), qStage = $('#quotaStage'), qIsland = $('#qIsland'), qPill = $('#qPill'), qCard = $('#qCard'), qLines = $('#qLines');
const callouts = $$('#quotaStage .callout');
const dims = (img, fb) => (img.naturalWidth ? [img.naturalWidth / 3, img.naturalHeight / 3] : fb);
const NS = 'http://www.w3.org/2000/svg';
const lines = [0, 1, 2].map((i) => {
  const l = document.createElementNS(NS, 'line'); l.setAttribute('stroke', 'rgba(255,255,255,0.4)'); l.setAttribute('stroke-width', '1.2');
  const dot = document.createElementNS(NS, 'circle'); dot.setAttribute('r', '4.5'); dot.setAttribute('fill', [G, Y, R][i]);
  const glow = document.createElementNS(NS, 'ellipse'); glow.setAttribute('fill', `url(#qg${i})`);
  qLines.append(glow, l, dot); return { l, dot, glow };
});
qLines.insertAdjacentHTML('afterbegin', `<defs>${[G, Y, R].map((c, i) => `<radialGradient id="qg${i}"><stop offset="0" stop-color="${c}" stop-opacity=".85"/><stop offset=".45" stop-color="${c}" stop-opacity=".3"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`).join('')}</defs>`);
qLines.insertBefore(qLines.querySelector('defs'), qLines.firstChild);

function quotaFrame(p) {
  const sw = qStage.clientWidth, sh = qStage.clientHeight;
  const CARD_PT = dims(qCard, [364, 342]), PILL_PT = dims(qPill, [322, 41]);
  const cw = Math.min(520, sw * 0.9), ch = cw * CARD_PT[1] / CARD_PT[0];
  const pw = cw * PILL_PT[0] / CARD_PT[0], ph = cw * PILL_PT[1] / CARD_PT[0];
  const top = Math.max(20, (sh - ch) / 2 - 10);
  // island pill
  qIsland.style.top = `${top}px`;
  qPill.style.height = `${ph}px`;
  const morph = eInOut(inv(0.5, 0.68, p));
  qIsland.style.opacity = String(eOut(inv(0.02, 0.1, p)) * (1 - inv(0.6, 0.66, p)));
  // card grows out of the pill: same scale as the app, clip from the collapsed size
  qCard.style.position = 'absolute'; qCard.style.top = `${top}px`; qCard.style.left = `${(sw - cw) / 2}px`; qCard.style.width = `${cw}px`;
  const ix = (cw - pw) / 2 * (1 - morph), ib = (ch - ph) * (1 - morph);
  const rr = lerp(ph * 0.34, 34, morph);
  qCard.style.clipPath = `inset(0 ${ix}px ${ib}px ${ix}px round 0 0 ${rr}px ${rr}px)`;
  qCard.style.opacity = morph > 0.001 ? '1' : '0';
  qStage.style.setProperty('--ga', String(0.25 + 0.45 * morph));
  // callouts under the pill
  const bx = (sw - pw) / 2, by = top + ph;
  const out = 1 - inv(0.46, 0.54, p);
  [0, 1, 2].forEach((i) => {
    const t0 = 0.12 + i * 0.1;
    const k = eOut(inv(t0, t0 + 0.08, p)) * out;
    const ax = bx + pw * [0.2, 0.5, 0.8][i], ay = by;
    const lx = sw / 2 + [-1, 0, 1][i] * Math.min(260, sw * 0.32), ly = by + [150, 210, 150][i];
    const { l, dot, glow } = lines[i];
    glow.setAttribute('cx', ax); glow.setAttribute('cy', ay + 8); glow.setAttribute('rx', 90 * k); glow.setAttribute('ry', 56 * k); glow.setAttribute('opacity', k);
    l.setAttribute('x1', ax); l.setAttribute('y1', ay + 6);
    l.setAttribute('x2', lerp(ax, lx, k)); l.setAttribute('y2', lerp(ay + 6, ly - 6, k)); l.setAttribute('opacity', k ? 1 : 0);
    dot.setAttribute('cx', ax); dot.setAttribute('cy', ay + 6); dot.setAttribute('opacity', k);
    const c = callouts[i];
    c.style.left = `${lx}px`; c.style.top = `${ly}px`;
    c.style.opacity = String(eOut(inv(t0 + 0.04, t0 + 0.1, p)) * out);
  });
}

// ---------------- approval sequence ----------------
const canvas = $('#seq'), sctx = canvas.getContext('2d');
const seq = {
  meta: null, imgs: [], lang: null, started: false,
  async load() {
    if (this.lang === T.assets) return;
    this.lang = T.assets; this.imgs = []; this.started = false;
    this.meta = await (await fetch(asset('seq/seq.json'))).json();
    canvas.width = this.meta.box[2] * 2; canvas.height = this.meta.box[3] * 2;
    this.drawn = -1;
    if (this.near) this.start();
  },
  start() {
    if (this.started || !this.meta) return; this.started = true;
    const n = this.meta.frames.length;
    for (let i = 0; i < n; i++) { const im = new Image(); im.decoding = 'async'; im.src = asset(`seq/a${String(i).padStart(3, '0')}.webp`); this.imgs[i] = im; }
  },
};
const CLICK = 85; // frame where the real app approves (t = 9.50 s)
function cursorPath(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 17); ctx.lineTo(4.2, 13); ctx.lineTo(7, 19.5); ctx.lineTo(9.6, 18.4); ctx.lineTo(6.9, 12.2); ctx.lineTo(12.4, 12.2); ctx.closePath();
  ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 2; ctx.fillStyle = '#000'; ctx.fill();
  ctx.shadowColor = 'transparent'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.3; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
}
function approveFrame(p) {
  if (!seq.meta) return;
  const n = seq.meta.frames.length;
  // hold longer on the settled card so the cursor has time to travel
  const f = p < 0.18 ? lerp(0, 22, p / 0.18) : p < 0.78 ? lerp(22, CLICK - 1, (p - 0.18) / 0.6) : lerp(CLICK - 1, n - 1, (p - 0.78) / 0.22);
  const i = Math.round(clamp(f, 0, n - 1));
  let img = seq.imgs[i];
  if (!img || !img.complete || !img.naturalWidth) {
    // nearest loaded neighbour
    for (let d = 1; d < n; d++) { const a = seq.imgs[i - d], b = seq.imgs[i + d]; if (a && a.complete && a.naturalWidth) { img = a; break; } if (b && b.complete && b.naturalWidth) { img = b; break; } }
  }
  const W = canvas.width, H = canvas.height;
  sctx.clearRect(0, 0, W, H);
  if (img && img.naturalWidth) sctx.drawImage(img, 0, 0, W, H);
  // cursor + click, aligned to the real approve button of this frame
  const ref = seq.meta.frames[Math.min(Math.max(i, 30), CLICK - 1)].a;
  if (ref) {
    const bx = (ref[0] + ref[2] / 2) * 2, by = (ref[1] + ref[3] / 2) * 2;
    const mv = eInOut(inv(26, 74, f));
    const x = lerp(W * 0.98, bx, mv) - Math.sin(mv * Math.PI) * 60, y = lerp(H * 0.98, by, mv) + Math.sin(mv * Math.PI) * 20;
    const away = eInOut(inv(CLICK + 6, CLICK + 18, f));
    const a = clamp((f - 24) / 3) * (1 - clamp((f - CLICK - 14) / 4));
    const press = f > CLICK - 1.5 && f < CLICK + 1.5 ? 1 - Math.abs(f - CLICK) / 1.5 : 0;
    const rk = inv(CLICK, CLICK + 16, f);
    if (rk > 0 && rk < 1) {
      sctx.save(); sctx.globalCompositeOperation = 'lighter';
      for (const [d, s] of [[0, 1], [0.15, 0.6]]) {
        const u = clamp((rk - d) / (1 - d)); if (u <= 0) continue;
        sctx.strokeStyle = `rgba(53,224,122,${(1 - u) * 0.9})`; sctx.lineWidth = 4 * (1 - u) + 1.5;
        sctx.beginPath(); sctx.arc(bx, by, 24 + 260 * s * eOut(u), 0, 7); sctx.stroke();
      }
      const g = sctx.createRadialGradient(bx, by, 0, bx, by, 90); g.addColorStop(0, `rgba(53,224,122,${0.5 * (1 - rk)})`); g.addColorStop(1, 'rgba(53,224,122,0)');
      sctx.fillStyle = g; sctx.beginPath(); sctx.arc(bx, by, 90, 0, 7); sctx.fill(); sctx.restore();
    }
    if (a > 0) { sctx.globalAlpha = a; cursorPath(sctx, lerp(x, x + 180, away), lerp(y, y + 140, away), 2.2 * (1 - 0.12 * press)); sctx.globalAlpha = 1; }
  }
  $$('#steps li').forEach((li, k) => li.classList.toggle('on', k === (f < 24 ? 0 : f < CLICK ? 1 : 2)));
  $('#approveBar').parentElement.style.setProperty('--p', String(p));
  return f;
}

// ---------------- cat ----------------
let catIdx = 0, catHover = false, catTimer = 0;
function buildMoods() {
  const ul = $('#moods'); ul.innerHTML = '';
  MOODS.forEach((m, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="k">${String(i + 1).padStart(2, '0')}</span><span><span class="n">${T['mn.' + m]}</span><span class="why">${T['m.' + m]}</span></span>`;
    li.addEventListener('mouseenter', () => { catHover = true; showCat(i); });
    li.addEventListener('click', () => showCat(i));
    ul.append(li);
  });
  ul.addEventListener('mouseleave', () => { catHover = false; });
  MOODS.forEach((m) => { const s = asset(`moods/${m}.webp`); moodCache[s] ||= Object.assign(new Image(), { src: s }); });
  showCat(catIdx);
}
function showCat(i) {
  catIdx = i;
  const m = MOODS[i];
  $$('#moods li').forEach((li, k) => li.classList.toggle('on', k === i));
  $('#catBig').src = asset(`moods/${m}.webp`);
  $('#catCaption').textContent = `${T['mn.' + m]} — ${T['m.' + m]}`;
  if (inCat) setMood(m, true);
}

// ---------------- FAQ ----------------
function buildFaq() {
  const qa = $('#qa'); qa.innerHTML = '';
  for (let i = 1; i <= 6; i++) {
    const d = document.createElement('div'); d.className = 'qa-item';
    d.innerHTML = `<button type="button" aria-expanded="false"><span>${T['q' + i]}</span><span class="pm"></span></button><div class="ans"><div><p>${T['a' + i]}</p></div></div>`;
    d.firstChild.addEventListener('click', () => { const o = d.classList.toggle('open'); d.firstChild.setAttribute('aria-expanded', o); });
    qa.append(d);
  }
}

// ---------------- terminal ----------------
const term = $('#term'), typedEl = $('#cmdTyped'), outEl = $('#termOut');
let termTimer = 0, termStarted = false;
const OUT = [
  ['========================================', 0], ['  Motomotos Installer', 0], ['========================================', 0], ['', 0],
  ['1) Downloading Motomotos.dmg ...', 0], ['2) Mounting disk image ...', 0], ['3) Installing to /Applications ...', 0],
  ['4) Clearing Gatekeeper quarantine flag ...', 0], ['5) Launching ...', 0], ['', 0], ['✅ Done — Motomotos is running from /Applications', 1],
];
function termReset() { clearTimeout(termTimer); termStarted = false; typedEl.textContent = ''; outEl.innerHTML = ''; if (termVisible) termStart(); }
function termStart() {
  if (termStarted) return; termStarted = true;
  if (reduced) { typedEl.textContent = INSTALL_CMD; return; }
  let k = 0;
  const type = () => {
    typedEl.textContent = INSTALL_CMD.slice(0, ++k);
    if (k < INSTALL_CMD.length) termTimer = setTimeout(type, 22 + Math.random() * 30);
    else termTimer = setTimeout(() => line(0), 550);
  };
  const line = (j) => {
    if (j >= OUT.length) return;
    const div = document.createElement('div'); div.textContent = OUT[j][0] || ' '; if (OUT[j][1]) div.className = 'ok';
    outEl.append(div); termTimer = setTimeout(() => line(j + 1), j === 4 ? 700 : 170);
  };
  type();
}
let termVisible = false;
new IntersectionObserver(([e]) => { termVisible = e.isIntersecting; if (termVisible) termStart(); }, { threshold: 0.5 }).observe(term);
$('#copyBtn').addEventListener('click', async () => {
  const b = $('#copyBtn'), label = b.lastElementChild;
  try { await navigator.clipboard.writeText(INSTALL_CMD); label.textContent = T['install.copied']; b.classList.add('done'); }
  catch { label.textContent = T['install.failed']; }
  setTimeout(() => { label.textContent = T['install.copy']; b.classList.remove('done'); }, 1800);
});


// ---------------- CN WeChat Native pay ----------------
const PAY_API = '/api/pay/wechat';
let payPollTimer = null;
let payOrderRef = null;

function payEls() {
  return {
    modal: $('#payModal'),
    msg: $('#payMsg'),
    qrWrap: $('#payQrWrap'),
    qr: $('#payQr'),
    codeWrap: $('#payCodeWrap'),
    code: $('#payCode'),
    hint: $('#payHint'),
    retry: $('#payRetry'),
    copy: $('#payCopy'),
  };
}

function renderQr(text) {
  const box = $('#payQr');
  box.innerHTML = '';
  if (typeof qrcode !== 'function') {
    const img = new Image();
    img.alt = 'WeChat Pay QR';
    img.width = 200; img.height = 200;
    img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(text);
    box.append(img);
    return;
  }
  const q = qrcode(0, 'M');
  q.addData(text);
  q.make();
  box.innerHTML = q.createImgTag(5, 0);
  const img = box.querySelector('img');
  if (img) { img.width = 200; img.height = 200; img.alt = 'WeChat Pay QR'; }
}

function openPayModal() {
  const e = payEls();
  if (!e.modal) return;
  e.modal.hidden = false;
  e.modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePayModal() {
  const e = payEls();
  if (!e.modal) return;
  e.modal.hidden = true;
  e.modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (payPollTimer) { clearInterval(payPollTimer); payPollTimer = null; }
}

function setPayState(kind, detail) {
  const e = payEls();
  const Tpay = T;
  e.qrWrap.hidden = true;
  e.codeWrap.hidden = true;
  e.retry.hidden = true;
  e.hint.textContent = Tpay['pay.hint'] || '';
  if (kind === 'loading') {
    e.msg.textContent = Tpay['pay.wait'] || '…';
  } else if (kind === 'qr') {
    e.msg.textContent = '';
    e.qrWrap.hidden = false;
    renderQr(detail);
  } else if (kind === 'paid') {
    e.msg.textContent = '';
    e.codeWrap.hidden = false;
    e.code.textContent = detail;
  } else if (kind === 'config') {
    e.msg.textContent = detail || Tpay['pay.config'];
    e.retry.hidden = false;
  } else {
    e.msg.textContent = detail || Tpay['pay.error'];
    e.retry.hidden = false;
  }
}

async function startWechatPay() {
  openPayModal();
  setPayState('loading');
  payOrderRef = null;
  try {
    const res = await fetch(PAY_API + '/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.code_url) {
      payOrderRef = data.order_ref;
      setPayState('qr', data.code_url);
      if (payPollTimer) clearInterval(payPollTimer);
      payPollTimer = setInterval(pollPayOrder, 2500);
      return;
    }
    if (data.blocker === 'appid_missing' || data.blocker === 'not_configured') {
      setPayState('config', data.hint_zh || T['pay.config']);
      return;
    }
    setPayState('error', data.hint_zh || data.message || T['pay.error']);
  } catch (err) {
    setPayState('error', T['pay.error']);
  }
}

async function pollPayOrder() {
  if (!payOrderRef) return;
  try {
    const res = await fetch(PAY_API + '/order/' + encodeURIComponent(payOrderRef));
    const data = await res.json().catch(() => ({}));
    if (data.status === 'paid' && data.activation_code) {
      if (payPollTimer) { clearInterval(payPollTimer); payPollTimer = null; }
      setPayState('paid', data.activation_code);
    }
  } catch (_) { /* keep polling */ }
}

// WeChat Pay UI disabled (no AppID cert). CN CTA stays coming-soon until Alipay is live.
const buyBtn = $('#buyBtn');
buyBtn.addEventListener('click', (ev) => {
  if (region !== 'cn') return;
  ev.preventDefault();
});


// ---------------- scramble text ----------------
const GLYPHS = '01#%@*+=-_<>/\\|$&';
function scramble(el, word, step = 55, done) {
  if (reduced) { el.textContent = word; done && done(); return; }
  let i = 0;
  const tick = () => {
    const shown = word.slice(0, i);
    const g = i < word.length ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : '';
    el.innerHTML = '';
    el.append(shown);
    if (g) { const s = document.createElement('span'); s.className = 'cur'; s.textContent = g; el.append(s); }
    if (i++ < word.length) setTimeout(tick, step); else done && done();
  };
  tick();
}
const onceVisible = (el, fn, threshold = 0.4) => new IntersectionObserver(([e], o) => { if (e.isIntersecting) { o.disconnect(); fn(); } }, { threshold }).observe(el);
onceVisible($('#wordmark'), () => { scramble($('#wordmark'), 'motomotos', 70); $('.gradline').style.setProperty('--gl', '1'); });
onceVisible($('#priceCard'), () => scramble($('#priceNum'), T['price.amount'], 80));

const HELLOS = ['Hello', '你好', 'こんにちは', '안녕하세요', 'Hallo', '哈囉'];
let hi = 0;
onceVisible($('#hello'), () => { scramble($('#hello'), HELLOS[0], 60); setInterval(() => { hi = (hi + 1) % HELLOS.length; scramble($('#hello'), HELLOS[hi], 60); }, 2200); });

// card spotlight
$$('.card').forEach((c) => c.addEventListener('pointermove', (e) => {
  const r = c.getBoundingClientRect(); c.style.setProperty('--mx', `${e.clientX - r.left}px`); c.style.setProperty('--my', `${e.clientY - r.top}px`);
}));

// ---------------- scroll engine ----------------
const menubar = $('#menubar');
const sections = $$('[data-mood]');
const navLinks = $$('.links a');
let inCat = false;
function progress(el) {
  const r = el.getBoundingClientRect();
  return clamp(-r.top / Math.max(1, r.height - innerHeight));
}
function onScroll() {
  menubar.classList.toggle('scrolled', scrollY > 8);
  // film grows into place
  const fr = film.getBoundingClientRect();
  const fk = eOut(inv(innerHeight * 1.05, innerHeight * 0.25, fr.top));
  frameEl.style.setProperty('--fs', String(lerp(0.86, 1, fk)));
  frameEl.style.setProperty('--fr', String(lerp(1.4, 1, fk)));
  frameEl.style.setProperty('--fg', String(0.35 * fk));

  const qp = progress(quota); quotaFrame(qp);
  const ar = $('#approve').getBoundingClientRect();
  seq.near = ar.top < innerHeight * 2.5 && ar.bottom > -innerHeight;
  if (seq.near) seq.start();
  const f = approveFrame(progress($('#approve')));

  // which section owns the notch
  let owner = 'working', mid = innerHeight * 0.45;
  for (const s of sections) { const r = s.getBoundingClientRect(); if (r.top < mid && r.bottom > mid) owner = s.dataset.mood; }
  inCat = owner === 'cycle';
  if (owner === 'cycle') owner = MOODS[catIdx];
  if (owner === 'waiting' && f !== undefined && f >= CLICK) owner = 'happy';
  setMood(owner);
  const ids = ['quota', 'approve', 'widgets', 'cat', 'pricing'];
  let on = null; for (const id of ids) { const r = document.getElementById(id).getBoundingClientRect(); if (r.top < mid && r.bottom > mid) on = id; }
  navLinks.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + on));
}
let ticking = false;
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; onScroll(); }); } }, { passive: true });
addEventListener('resize', onScroll);

// cat auto-cycle while visible
setInterval(() => { if (inCat && !catHover) showCat((catIdx + 1) % MOODS.length); }, 1700);
// redraw the approval canvas as frames arrive
setInterval(() => { if (seq.near) approveFrame(progress($('#approve'))); }, 250);

// ---------------- boot ----------------
applyCopy();
onScroll();
document.fonts.ready.then(() => requestAnimationFrame(runIntro));
// Sync paint used Accept-Language / session geo; refine with live IP when needed.
refineRegion().then((r) => {
  if (r === region) return;
  region = r;
  T = copyFor(region);
  applyCopy();
}).catch(() => {});

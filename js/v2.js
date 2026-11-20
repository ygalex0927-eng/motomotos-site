import { wireBuy } from './buy.js?v=202611201500';
import { copyFor, currentRegion, saveRegion, refineRegion, CREEM_BUY, INSTALL_CMD } from './i18n.js?v=202611201500';
import { copy2For } from './copy2.js?v=202611201500';
import { Island, autoplay, ISLAND_DEFS } from './island.js?v=202610271500';
import { buildWidgets, quotaCard } from './widgets.js?v=202610271500';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MOODS = ['working', 'busy', 'waiting', 'fishing', 'music', 'sleeping', 'happy', 'error', 'eating', 'message', 'focusing'];
const V2 = (p) => `/assets/v2/${p}`;

let region = currentRegion();
let T = {};
const lang = () => (region === 'cn' ? 'zh' : 'en');

$('#defs').innerHTML = ISLAND_DEFS;

// ---------------- copy ----------------
function applyCopy() {
  T = { ...copyFor(region), ...copy2For(region) };
  document.documentElement.lang = region === 'cn' ? 'zh-CN' : 'en';
  document.title = T.title;
  $('meta[name="description"]').setAttribute('content', T.desc);
  $$('[data-t]').forEach((el) => { const v = T[el.dataset.t]; if (typeof v === 'string') el.textContent = v; });
  $$('[data-th]').forEach((el) => { const v = T[el.dataset.th]; if (typeof v === 'string') el.innerHTML = v; });
  $$('#lang [data-l]').forEach((s) => s.classList.toggle('on', s.dataset.l === region));
  $$('img[data-v2]').forEach((img) => { img.src = V2(img.dataset.v2); });
  $('#priceNum').textContent = T['price.amount'];
  $('#buyPill').textContent = T['nav.buy'];
  $('#heroBuy').textContent = T['hero.cta2'];
  const buy = $('#buyBtn');
  buy.textContent = T['price.cta'];
  if (region === 'cn') { buy.href = '#'; buy.removeAttribute('target'); buy.removeAttribute('rel'); }
  else { buy.href = CREEM_BUY; buy.target = '_blank'; buy.rel = 'noopener'; }
  $('#cmd').textContent = '~ % ' + INSTALL_CMD;
  buildChips(); buildMoments(); buildPanel(); buildMoods(); buildFaq();
  hero.setLang(lang());
  wireHero();
}

// ---------------- buy: in the app first (pays → this Mac unlocks), web checkout as fallback ----------------
wireBuy({ region: () => region, creemUrl: CREEM_BUY });

$('#lang').addEventListener('click', () => {
  region = region === 'cn' ? 'overseas' : 'cn';
  saveRegion(region);
  applyCopy();
});

// ---------------- hero: the live island ----------------
const SEQ = [['idle', 1700], ['working', 2600], ['band', 2700], ['expanded', 3800], ['idle', 1200], ['music', 2400], ['split', 3000], ['waiting', 3400], ['done', 3000], ['error', 2600], ['focus', 2800]];
const CHIPS = ['working', 'band', 'expanded', 'music', 'split', 'waiting', 'done', 'error', 'focus'];
const hero = new Island($('#heroStage'), { lang: lang(), catBase: V2('cat/') });
let stopAuto = null, resumeTimer = null;
const markChip = (s) => $$('#chips .chip').forEach((c) => c.classList.toggle('on', c.dataset.s === s));
function startAuto() { if (reduced) { hero.go('expanded'); markChip('expanded'); return; } stopAuto = autoplay(hero, SEQ, markChip); }
function buildChips() {
  $('#chips').innerHTML = CHIPS.map((s) => `<button class="chip" type="button" data-s="${s}">${T['chip.' + s]}</button>`).join('');
  $$('#chips .chip').forEach((c) => c.addEventListener('click', () => {
    if (stopAuto) { stopAuto(); stopAuto = null; }
    clearTimeout(resumeTimer);
    hero.go('idle');
    setTimeout(() => { hero.go(c.dataset.s); markChip(c.dataset.s); }, 260);
    resumeTimer = setTimeout(startAuto, 9000);
  }));
  markChip(hero.s);
}
function fitStage() {
  const box = $('#heroBox');
  const k = Math.min(1, box.clientWidth / 1240);
  box.style.setProperty('--k', k.toFixed(3));
  // The open card is the tallest state; the box only needs that much.
  box.style.height = `${Math.round(620 * k)}px`;
}
addEventListener('resize', fitStage);

// Try it: rest the pointer on the island → the band; click → open; leave → it tucks itself away.
let leaveTimer = null;
const heroBody = () => $('#heroStage .isl-body');
function wireHero() {
  const body = heroBody();
  if (!body || body.dataset.wired) return;
  body.dataset.wired = '1';
  body.addEventListener('mouseenter', () => {
    clearTimeout(leaveTimer);
    if (['idle', 'working', 'music', 'split'].includes(hero.s)) takeHero('band');
  });
  body.addEventListener('mouseleave', () => {
    clearTimeout(leaveTimer);
    if (hero.s === 'band' || hero.s === 'expanded') leaveTimer = setTimeout(() => takeHero(musicOn ? 'music' : 'idle', 0), hero.s === 'expanded' ? 700 : 250);
    resumeTimer = setTimeout(startAuto, 8000);
  });
  body.addEventListener('click', () => {
    clearTimeout(leaveTimer);
    takeHero(hero.s === 'expanded' ? 'band' : 'expanded');
  });
}

// ---------------- moments: one state per small stage ----------------
const MOMENTS = ['music', 'split', 'done', 'waiting', 'error', 'focus'];
let momentIslands = [];
function buildMoments() {
  const grid = $('#momentsGrid');
  grid.innerHTML = MOMENTS.map((m) => `<article class="moment reveal in" data-m="${m}"><button class="replay" type="button">↻ ${T['mo.replay']}</button><div class="mstage"><div class="stage"></div></div><div class="mtext"><h3>${T[`mo.${m}.h`]}</h3><p>${T[`mo.${m}.p`]}</p></div></article>`).join('');
  momentIslands = $$('.moment', grid).map((el) => {
    const st = $('.stage', el);
    const isl = new Island(st, { lang: lang(), catBase: V2('cat/'), state: 'idle' });
    const m = el.dataset.m;
    const play = () => { isl.go('idle'); setTimeout(() => isl.go(m === 'split' ? 'working' : m), 350); if (m === 'split') setTimeout(() => isl.go('split'), 1500); };
    $('.replay', el).addEventListener('click', play);
    new IntersectionObserver(([e], o) => { if (e.isIntersecting) { o.disconnect(); setTimeout(play, 200); } }, { threshold: 0.5 }).observe(el);
    return isl;
  });
  fitMoments();
}
function fitMoments() {
  $$('.moment .mstage').forEach((ms) => {
    const st = $('.stage', ms);
    const m = ms.closest('.moment').dataset.m;
    // Scale each state to fill its card: the widest shape of that moment fits the card with a margin.
    const w = { music: 560, split: 600, done: 700, waiting: 800, error: 680, focus: 680 }[m] || 700;
    const h = { waiting: 330 }[m] || 150;
    const k = Math.min(0.75, (ms.clientWidth - 24) / w);
    st.style.setProperty('--k', k.toFixed(3));
    ms.style.height = `${Math.round(h * k + 34)}px`;
  });
}
addEventListener('resize', fitMoments);

// ---------------- toolbox: HTML widgets that work; the hero island answers them ----------------
let musicOn = false;
function takeHero(state, ms) {
  if (stopAuto) { stopAuto(); stopAuto = null; }
  clearTimeout(resumeTimer);
  hero.go(state); markChip(state);
  if (ms) resumeTimer = setTimeout(() => { hero.go(musicOn ? 'music' : 'idle'); resumeTimer = setTimeout(startAuto, 6000); }, ms);
}
function buildPanel() {
  buildWidgets($('#panel'), T, lang(), {
    onFocusDone: () => takeHero('focus', 4500),
    onMusic: (on) => { musicOn = on; takeHero(on ? 'music' : 'idle', on ? 0 : 1200); if (on) resumeTimer = setTimeout(startAuto, 12000); },
  });
  $('#quotaDemo').innerHTML = quotaCard(T);
}

// ---------------- cat ----------------
function buildMoods() {
  $('#moods').innerHTML = MOODS.map((m, i) => `<li data-m="${m}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span>${T['mn.' + m]}</span></li>`).join('');
  $$('#moods li').forEach((li) => {
    li.addEventListener('mouseenter', () => showCat(li.dataset.m));
    li.addEventListener('click', () => showCat(li.dataset.m));
  });
  showCat('working');
}
function showCat(m) {
  $$('#moods li').forEach((li) => li.classList.toggle('on', li.dataset.m === m));
  const img = $('#catBig');
  img.src = V2(`cat/${m}.webp`);
  img.alt = T['mn.' + m];
  $('#catCaption').textContent = `${T['mn.' + m]} — ${T['m.' + m]}`;
}

// ---------------- faq / copy ----------------
function buildFaq() {
  $('#qa').innerHTML = T.faq.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}</summary><p>${a}</p></details>`).join('');
}
$('#copyBtn').addEventListener('click', async () => {
  const b = $('#copyBtn');
  try { await navigator.clipboard.writeText(INSTALL_CMD); b.textContent = T['in.copied']; }
  catch { b.textContent = T['install.failed'] || 'Select and copy'; }
  setTimeout(() => { b.textContent = T['in.copy']; }, 1600);
});

// ---------------- reveal ----------------
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.15 });
$$('.reveal').forEach((el) => io.observe(el));

// ---------------- start ----------------
applyCopy();
fitStage();
startAuto();
refineRegion().then((r) => { if (r !== region) { region = r; applyCopy(); } });

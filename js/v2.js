import { copyFor, currentRegion, saveRegion, refineRegion, CREEM_BUY, INSTALL_CMD } from './i18n.js?v=202610251230';
import { copy2For } from './copy2.js?v=202610271400';
import { Island, autoplay, ISLAND_DEFS } from './island.js?v=202610271400';

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
}

// ---------------- alipay (cn) — same flow as before ----------------
let payBusy = false;
document.addEventListener('click', async (e) => {
  const b = e.target.closest('#buyBtn');
  if (!b || region !== 'cn') return;
  e.preventDefault();
  if (payBusy) return;
  payBusy = true;
  const label = b.textContent;
  b.textContent = '正在打开支付宝…';
  try {
    const r = await fetch('/api/pay/alipay/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    const d = await r.json();
    if (!r.ok || !d.ok || !d.pay_url || !/^https:\/\/openapi\.alipay\.com\//.test(d.pay_url)) throw new Error(d.error || 'create_failed');
    try { if (d.order_ref) sessionStorage.setItem('moto_alipay_ref', d.order_ref); } catch (_) {}
    location.href = d.pay_url;
  } catch (err) {
    b.textContent = label;
    payBusy = false;
    alert('支付宝暂时打不开，请稍后再试。');
  }
});

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

// ---------------- widgets: real cards from the app ----------------
function buildPanel() {
  const cards = ['usage', 'pomodoro', 'clock', 'battery', 'tokenuse'];
  $('#panel').innerHTML = cards.map((k) => `<article class="wcard reveal in"><div class="img"><img src="${V2(`cards/${k}.webp`)}" alt="${T[`wg.${k}.h`]}" width="368" height="368" loading="lazy"></div><div class="txt"><h3>${T[`wg.${k}.h`]}</h3><p>${T[`wg.${k}.p`]}</p></div></article>`).join('')
    + `<article class="wcard text reveal in"><div><span class="big">${T['wg.more.big']}</span> <span style="font-size:20px;font-weight:600">${T['wg.more.h']}</span></div><p style="color:var(--ink2);margin:10px 0 0">${T['wg.more.p']}</p><div class="tags">${T['wg.tags'].map((t) => `<span>${t}</span>`).join('')}</div></article>`;
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

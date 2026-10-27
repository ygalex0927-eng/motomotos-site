// Buy button: open the Motomotos app (motomotos://buy, 1.0.5+) so paying unlocks this Mac with no code.
// The web checkout (Alipay page / Creem link, then paste a code) stays as the fallback.
const COPY = {
  cn: {
    title: '在 App 里买，付完自动解锁',
    body: '打开 motomotos，用支付宝付 ¥19.9。付完这台 Mac 直接解锁，不用激活码。',
    open: '打开 motomotos 购买',
    dl: '还没装？下载 motomotos',
    web: '不装 App，网页直接付（付完显示激活码）',
    opening: '正在打开 motomotos…',
    opened: '已打开 motomotos，在弹出的支付宝里付款就行。',
    missed: '没打开？先下载安装 motomotos（需要 1.0.5 或以上），或用下面的网页付款。',
    paying: '正在打开支付宝…',
    payFail: '支付宝暂时打不开，请稍后再试。',
    close: '关闭',
  },
  overseas: {
    title: 'Buy in the app — unlocks on its own',
    body: 'Open Motomotos and pay $4.99 with Creem. This Mac unlocks as soon as you’ve paid. No key to paste.',
    open: 'Open Motomotos to buy',
    dl: 'Not installed? Download Motomotos',
    web: 'Pay on the web instead (you get a key to paste)',
    opening: 'Opening Motomotos…',
    opened: 'Motomotos is open. Finish checkout in the page it opened.',
    missed: 'Nothing opened? Install Motomotos 1.0.5 or later first, or pay on the web below.',
    paying: 'Opening checkout…',
    payFail: 'Checkout isn’t available right now. Try again later.',
    close: 'Close',
  },
};

const CSS = `
.buy-sheet{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:16px;background:rgba(0,0,0,.55);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.buy-sheet[hidden]{display:none}
.buy-card{position:relative;width:min(400px,100%);padding:28px 24px 20px;border-radius:22px;background:#17171a;color:#f3f1ec;box-shadow:0 30px 80px rgba(0,0,0,.5),inset 0 0 0 1px rgba(255,255,255,.08);font-size:15px;line-height:1.55;font-family:inherit;text-align:left}
.buy-card h3{margin:0 0 8px;font-size:19px;line-height:1.3;font-weight:650}
.buy-card p{margin:0 0 18px;color:rgba(243,241,236,.72)}
.buy-card .buy-go,.buy-card .buy-dl{display:block;width:100%;box-sizing:border-box;padding:13px 16px;border-radius:12px;border:0;font:inherit;font-weight:600;text-align:center;text-decoration:none;cursor:pointer}
.buy-card .buy-go{background:#f3f1ec;color:#111}
.buy-card .buy-dl{margin-top:10px;background:rgba(255,255,255,.08);color:#f3f1ec}
.buy-card .buy-status{min-height:1.5em;margin:12px 0 0;font-size:13px;color:#e8c27a}
.buy-card .buy-web{display:inline-block;margin-top:12px;padding:0;border:0;background:none;color:rgba(243,241,236,.55);font:inherit;font-size:13px;text-decoration:underline;cursor:pointer}
.buy-card .buy-x{position:absolute;top:10px;right:12px;width:32px;height:32px;border:0;border-radius:50%;background:none;color:rgba(243,241,236,.5);font-size:22px;line-height:1;cursor:pointer}
`;

export function wireBuy({ region, creemUrl, button = '#buyBtn' }) {
  let sheet, statusEl, payBusy = false;

  function build() {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
    sheet = document.createElement('div');
    sheet.className = 'buy-sheet';
    sheet.hidden = true;
    sheet.innerHTML = `<div class="buy-card" role="dialog" aria-modal="true" aria-labelledby="buyTitle">
      <button class="buy-x" type="button"></button>
      <h3 id="buyTitle"></h3><p class="buy-body"></p>
      <button class="buy-go" type="button"></button>
      <a class="buy-dl" href="/downloads/Motomotos.dmg"></a>
      <p class="buy-status" aria-live="polite"></p>
      <button class="buy-web" type="button"></button>
    </div>`;
    document.body.appendChild(sheet);
    statusEl = sheet.querySelector('.buy-status');
    sheet.addEventListener('click', (e) => { if (e.target === sheet || e.target.closest('.buy-x')) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) close(); });
    sheet.querySelector('.buy-go').addEventListener('click', openApp);
    sheet.querySelector('.buy-web').addEventListener('click', payOnWeb);
  }

  function open() {
    if (!sheet) build();
    const c = COPY[region()] || COPY.overseas;
    sheet.querySelector('#buyTitle').textContent = c.title;
    sheet.querySelector('.buy-body').textContent = c.body;
    sheet.querySelector('.buy-go').textContent = c.open;
    sheet.querySelector('.buy-dl').textContent = c.dl;
    sheet.querySelector('.buy-web').textContent = c.web;
    sheet.querySelector('.buy-x').setAttribute('aria-label', c.close);
    sheet.querySelector('.buy-x').textContent = '×';
    statusEl.textContent = '';
    sheet.hidden = false;
    sheet.querySelector('.buy-go').focus();
  }

  function close() { sheet.hidden = true; }

  // The app comes forward when it handles the link, so the page loses focus. No focus change → not installed or too old.
  function openApp() {
    const c = COPY[region()] || COPY.overseas;
    statusEl.textContent = c.opening;
    let handled = false;
    const mark = () => { handled = true; statusEl.textContent = c.opened; };
    window.addEventListener('blur', mark, { once: true });
    document.addEventListener('visibilitychange', () => { if (document.hidden) mark(); }, { once: true });
    location.href = `motomotos://buy?ch=${region() === 'cn' ? 'alipay' : 'creem'}`;
    setTimeout(() => { if (!handled) statusEl.textContent = c.missed; }, 2500);
  }

  async function payOnWeb() {
    const c = COPY[region()] || COPY.overseas;
    if (region() !== 'cn') { window.open(creemUrl, '_blank', 'noopener'); return; }
    if (payBusy) return;
    payBusy = true;
    statusEl.textContent = c.paying;
    try {
      const r = await fetch('/api/pay/alipay/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
      const d = await r.json();
      if (!r.ok || !d.ok || !d.pay_url || !/^https:\/\/openapi\.alipay\.com\//.test(d.pay_url)) throw new Error(d.error || 'create_failed');
      try { if (d.order_ref) sessionStorage.setItem('moto_alipay_ref', d.order_ref); } catch (_) {}
      location.href = d.pay_url;
    } catch (err) {
      payBusy = false;
      statusEl.textContent = c.payFail;
    }
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest(button)) return;
    e.preventDefault();
    open();
  });
}

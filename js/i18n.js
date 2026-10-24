// Region decides language and price together. One price per page, never two.
export const CREEM_BUY = 'https://www.creem.io/payment/prod_zA7FU0N4xT94P9fGuDpF';
export const INSTALL_CMD = 'curl -fsSL https://motomotos.com/install.sh | bash';
export const INSTALL_CMD_HTTP = 'curl -fsSL http://motomotos.com/install.sh | bash';
export const SUPPORT = 'support@motomotos.com';

const en = {
  lang: 'en', region: 'overseas', assets: 'assets/en',
  title: 'motomotos — the Dynamic Island for your AI agents',
  desc: 'motomotos turns the MacBook notch into a Dynamic Island that tells you when your AI agents finish, fail or need you. Quota, sessions, music, widgets and a cat — on any background you like. 10 days free, then $4.99 once.',
  'nav.quota': 'Quota', 'nav.approve': 'Alerts', 'nav.widgets': 'Widgets', 'nav.cat': 'The cat', 'nav.pricing': 'Pricing', 'nav.install': 'Install',
  'nav.buy': 'Buy · $4.99',
  'hero.eyebrow': 'motomotos · for the notch on your Mac',
  'hero.l1': 'Your notch,', 'hero.l2': 'finally', 'hero.l3': 'awake.',
  'hero.sub': 'motomotos turns the notch into a Dynamic Island for your AI agents. It lights up the moment a task finishes, fails or needs you — and you can dress it in any picture, GIF or video you like.',
  'hero.cta1': 'Install · 10 days free', 'hero.cta2': 'Buy once · $4.99',
  'hero.meta': 'macOS 13+ · Apple silicon · 6 languages',
  'film.label': 'The 15-second film', 'film.note': 'Every pixel of the island is the real app.', 'film.sound': 'Sound on', 'film.mute': 'Sound off',
  'quota.eyebrow': '01 — Quota', 'quota.h': "Every agent's quota,<br><em>at a glance.</em>",
  'quota.p': 'Grok CLI, Codex and Claude Code side by side: weekly and 5-hour windows, reset times, exact percentages. If a number can’t be read, motomotos says so. It never makes one up.',
  'quota.c1n': 'Grok CLI', 'quota.c1v': 'weekly 42%', 'quota.c2n': 'Codex', 'quota.c2v': '5-hour 55%', 'quota.c3n': 'Claude Code', 'quota.c3v': 'weekly 61%',
  'approve.eyebrow': '02 — Alerts', 'approve.h': 'Know the moment<br><em>an agent needs you.</em>',
  'approve.p': 'Done, failed, waiting for approval — the island lights up, the cat reacts, and one click takes you back to the right terminal. Running with full access? The island can hold each change until you say OK.',
  'approve.step1': 'An agent asks', 'approve.step2': 'The island lights up', 'approve.step3': 'One click back',
  'nav.diy': 'Background',
  'diy.eyebrow': '03 — Background',
  'diy.h': 'Your island,<br><em>your wallpaper.</em>',
  'diy.p': 'Drop in any picture, GIF or video. It shows under your cards when the island opens; closed, the island stays pure black like the notch. Set how strong and how blurred it is.',
  'diy.still': 'Picture',
  'diy.gif': 'GIF',
  'diy.formats': 'PNG · JPG · HEIC · WebP · GIF · MP4 · MOV',
  'diy.note': 'Shown: the real island with a landscape and a lava-lamp GIF at 60% strength.',
  'widgets.eyebrow': '04 — Widgets', 'widgets.h': 'Everything else<br><em>lives up here too.</em>',
  'w.term.h': 'Every agent, one row', 'w.term.p': 'Running, done, needs approval. Click a row to jump back to its terminal.',
  'w.grid.h': '17 widgets', 'w.grid.p': 'Calendar, quota, music, notes, to-dos, pomodoro… on an S / M / L grid. Long-press to arrange.',
  'w.hud.h': 'Volume & brightness', 'w.hud.p': 'A HUD that grows out of the island instead of landing on your work.',
  'w.hover.h': 'Hover to wake it', 'w.hover.p': 'A soft glow runs round the edge. Click to open. It never steals focus.',
  'w.music.h': 'Now Playing', 'w.music.p': 'Apple Music and Spotify with cover art and controls. NetEase Cloud Music with lyrics.',
  'w.lang.h': 'Speaks six languages', 'w.lang.p': 'English, 简体中文, 繁體中文, 日本語, 한국어, Deutsch.',
  'cat.eyebrow': '05 — The cat', 'cat.h': 'Meet the cat.<br><em>It knows how your day is going.</em>',
  'cat.p': 'Eleven moods, each one driven by what your Mac is actually doing. Hover a mood — the island at the top of this page follows.',
  'm.working': 'one session is running', 'm.busy': 'two or more are running', 'm.waiting': 'a session waits for you',
  'm.fishing': 'nothing is running', 'm.music': 'music is playing', 'm.sleeping': 'idle for a while, or late at night',
  'm.happy': 'a session just finished', 'm.error': 'a session just failed', 'm.eating': 'your quota just reset',
  'm.message': 'a new message came in', 'm.focusing': 'a focus block is running',
  'mn.working': 'Working', 'mn.busy': 'Busy', 'mn.waiting': 'Waiting', 'mn.fishing': 'Slacking', 'mn.music': 'Listening', 'mn.sleeping': 'Sleeping',
  'mn.happy': 'Happy', 'mn.error': 'Error', 'mn.eating': 'Snacking', 'mn.message': 'Reading', 'mn.focusing': 'Focusing',
  'price.eyebrow': '06 — Pricing', 'price.h': 'One price.<br><em>Yours to keep.</em>',
  'price.trial': '10 days, every feature. Then:', 'price.amount': '$4.99', 'price.unit': 'once',
  'price.b1': 'No subscription, ever', 'price.b2': 'Future Mac updates included', 'price.b3': 'Use it on up to 3 of your Macs', 'price.b4': 'Checkout by Creem — card or Apple Pay',
  'price.cta': 'Buy with Creem', 'price.note': 'Best: buy inside the Motomotos app (Settings → Account) — unlocks automatically after payment. Website buy still emails a key you can paste.',
  'pay.title': 'WeChat Pay',
  'pay.scan': 'Scan with WeChat',
  'pay.wait': 'Waiting for payment…',
  'pay.success': 'Paid. Your activation code:',
  'pay.copy': 'Copy code',
  'pay.copied': 'Copied',
  'pay.close': 'Close',
  'pay.retry': 'Retry',
  'pay.config': 'WeChat checkout is almost ready. Merchant AppID still needs binding.',
  'pay.error': 'Could not start checkout. Try again later.',
  'pay.hint': 'After paying, paste the code in motomotos → Settings → Account.',

  'price.after': 'After the trial, paid widgets lock. The island, the clock and the cat keep working.',
  'install.eyebrow': '07 — Install', 'install.h': 'One line<br><em>in Terminal.</em>',
  'install.p': 'Until Apple notarization is in place, motomotos installs from Terminal. It’s one paste, and it skips the “can’t be verified” dialog.',
  'install.copy': 'Copy', 'install.copied': 'Copied', 'install.failed': 'Select and copy',
  'install.s1': 'Press ⌘ Space, type Terminal, press Return.', 'install.s2': 'Paste with ⌘ V and press Return.', 'install.s3': 'motomotos opens on its own. Your 10 days start now.',
  'install.what': 'What the command does',
  'install.w1': 'Downloads the official package from motomotos.com', 'install.w2': 'Installs it into Applications', 'install.w3': 'Clears the “downloaded from the internet” flag', 'install.w4': 'Opens motomotos',
  'install.http': 'If HTTPS fails on your network:',
  'faq.eyebrow': '08 — Questions', 'faq.h': 'Good questions.',
  'q1': 'Which Macs does it run on?', 'a1': 'Apple silicon Macs on macOS 13 or later. It looks best on a MacBook with a notch; with the lid closed on an external display, or on a Mac without a notch, the island sits at the top middle of the menu bar.',
  'q2': 'Which AI tools does it work with?', 'a2': 'Alerts and sessions: Codex (CLI and the desktop app) and Hermes work on their own; Grok CLI after a one-click hook in Settings. Quota: Grok CLI and Codex, plus Claude Code once you connect its status line. Claude Code session alerts are on the way.',
  'q3': 'What happens to my data?', 'a3': 'motomotos runs on your Mac. It doesn’t scrape your keychain or collect credentials. The privacy policy has the details.',
  'q4': 'What happens after 10 days?', 'a4': 'Paid widgets lock until you buy. The island, the clock and the cat keep working.',
  'q5': 'How many Macs can I use?', 'a5': 'Up to three of your own Macs at once. Deactivate one to move to a fourth.',
  'q6': 'Why install from Terminal?', 'a6': 'Apple notarization isn’t set up yet. Once it is, a normal drag-to-Applications .dmg comes back.',
  'foot.tag': 'The AI Dynamic Island for your Mac.', 'foot.privacy': 'Privacy', 'foot.terms': 'Terms', 'foot.support': 'Support',
  'foot.company': '深圳市爱发濠科技有限公司', 'foot.beian': '<a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">粤ICP备2026004847号-3</a>',
};

const zh = {
  lang: 'zh-CN', region: 'cn', assets: 'assets/zh',
  title: 'motomotos — Mac 刘海上的 AI 提醒灵动岛',
  desc: 'motomotos 把 MacBook 刘海变成 AI agent 的提醒灵动岛：任务做完、出错、等你批准，岛立刻告诉你。额度、会话、音乐、组件和一只小猫，背景随你换。免费试用 10 天，之后 ¥19.9 买断。',
  'nav.quota': '额度', 'nav.approve': '提醒', 'nav.widgets': '组件', 'nav.cat': '小猫', 'nav.pricing': '价格', 'nav.install': '安装',
  'nav.buy': '¥19.9 买断',
  'hero.eyebrow': 'motomotos · 为 Mac 的刘海而做',
  'hero.l1': '刘海，', 'hero.l2': '终于', 'hero.l3': '醒了。',
  'hero.sub': 'motomotos 把 MacBook 的刘海变成 AI agent 的提醒灵动岛：任务做完、出错、等你批准，岛立刻亮起来。背景随你换，静态图、动图、视频都行。',
  'hero.cta1': '安装 · 免费试用 10 天', 'hero.cta2': '买断 ¥19.9',
  'hero.meta': 'macOS 13+ · Apple 芯片 · 6 种语言',
  'film.label': '15 秒宣传片', 'film.note': '岛上每一个像素，都来自真实的 App。', 'film.sound': '打开声音', 'film.mute': '关闭声音',
  'quota.eyebrow': '01 — 额度', 'quota.h': '每个 Agent 的额度，<br><em>一眼看清。</em>',
  'quota.p': 'Grok CLI、Codex、Claude Code 并排：每周和 5 小时窗口、重置时间、精确百分比。读不到的数字，motomotos 会直说，绝不编一个出来。',
  'quota.c1n': 'Grok CLI', 'quota.c1v': '本周 42%', 'quota.c2n': 'Codex', 'quota.c2v': '5 小时 55%', 'quota.c3n': 'Claude Code', 'quota.c3v': '本周 61%',
  'approve.eyebrow': '02 — 提醒', 'approve.h': 'agent 需要你的那一刻，<br><em>你马上知道。</em>',
  'approve.p': '做完了、出错了、等你批准——岛亮起来，小猫有反应，点一下就回到对应的终端。开着完全访问？岛还能把每次改动先拦下来，等你点头。',
  'approve.step1': 'agent 来问', 'approve.step2': '岛亮起来', 'approve.step3': '点一下回去',
  'nav.diy': '背景',
  'diy.eyebrow': '03 — 背景',
  'diy.h': '你的岛，<br><em>你的壁纸。</em>',
  'diy.p': '放一张你喜欢的图、动图或视频。岛展开时它铺在卡片下面；收起时还是和刘海一样纯黑。浓度和模糊都能调。',
  'diy.still': '静态图',
  'diy.gif': '动图',
  'diy.formats': 'PNG · JPG · HEIC · WebP · GIF · MP4 · MOV',
  'diy.note': '画面是真实的岛：一张风景图和一张熔岩灯动图，背景浓度 60%。',
  'widgets.eyebrow': '04 — 组件', 'widgets.h': '其余的一切，<br><em>也住在这里。</em>',
  'w.term.h': '每个 Agent，一行', 'w.term.p': '运行中、已完成、等你批准。点一行，跳回它的终端。',
  'w.grid.h': '17 种组件', 'w.grid.p': '日历、额度、音乐、便签、待办、番茄钟……S / M / L 网格，长按随意摆。',
  'w.hud.h': '音量与亮度', 'w.hud.p': '从岛里长出来的提示条，不会盖在你正在做的事上。',
  'w.hover.h': '悬停唤醒', 'w.hover.p': '一圈柔光沿着边缘流动。点击才展开，从不抢焦点。',
  'w.music.h': '正在播放', 'w.music.p': 'Apple 音乐、Spotify 有封面和播放控制；网易云音乐还能看歌词。',
  'w.lang.h': '会说六种语言', 'w.lang.p': '简体中文、繁體中文、English、日本語、한국어、Deutsch。',
  'cat.eyebrow': '05 — 小猫', 'cat.h': '认识一下这只猫。<br><em>它懂你今天过得怎样。</em>',
  'cat.p': '11 种心情，全由你的 Mac 正在发生的事驱动。把鼠标停在一种心情上——页面顶上的岛也会跟着变。',
  'm.working': '一个会话正在跑', 'm.busy': '两个以上同时在跑', 'm.waiting': '有会话在等你批准',
  'm.fishing': '什么都没在跑', 'm.music': '正在放音乐', 'm.sleeping': '闲了很久，或者夜深了',
  'm.happy': '一个会话刚做完', 'm.error': '一个会话刚出错', 'm.eating': '额度刚刚重置',
  'm.message': '来了新消息', 'm.focusing': '番茄钟专注中',
  'mn.working': '工作中', 'mn.busy': '忙碌中', 'mn.waiting': '等待中', 'mn.fishing': '摸鱼中', 'mn.music': '听歌中', 'mn.sleeping': '睡觉中',
  'mn.happy': '开心', 'mn.error': '出错了', 'mn.eating': '吃小鱼干', 'mn.message': '看消息', 'mn.focusing': '专注中',
  'price.eyebrow': '06 — 价格', 'price.h': '一个价格，<br><em>买了就是你的。</em>',
  'price.trial': '先完整试用 10 天，然后：', 'price.amount': '¥19.9', 'price.unit': '买断',
  'price.b1': '不订阅，永远不', 'price.b2': '含以后的 Mac 版本更新', 'price.b3': '最多 3 台自己的 Mac', 'price.b4': '微信 / 支付宝通道筹备中',
  'price.cta': '支付通道筹备中', 'price.note': '通道开通后发放激活码。打开 motomotos → 设置 → 账户，填入即可。',
  'pay.title': '微信支付',
  'pay.scan': '请用微信扫一扫付款',
  'pay.wait': '等待支付结果…',
  'pay.success': '支付成功，你的激活码：',
  'pay.copy': '复制激活码',
  'pay.copied': '已复制',
  'pay.close': '关闭',
  'pay.retry': '重试',
  'pay.config': '微信收款还差一步：商户平台需绑定 AppID。绑定后即可出码。',
  'pay.error': '暂时无法下单，请稍后再试。',
  'pay.hint': '付款后把激活码粘贴到 motomotos → 设置 → 账户。',

  'price.after': '试用到期只锁付费组件。收起的岛、时钟和小猫照常可用。',
  'install.eyebrow': '07 — 安装', 'install.h': '终端里，<br><em>一行搞定。</em>',
  'install.p': '在开通 Apple 公证之前，motomotos 用终端安装：粘贴一次就好，也不会弹「无法验证开发者」。',
  'install.copy': '复制', 'install.copied': '已复制', 'install.failed': '请手动复制',
  'install.s1': '按 ⌘ 空格，输入「终端」，回车。', 'install.s2': '按 ⌘ V 粘贴，再按回车。', 'install.s3': 'motomotos 会自己打开，10 天试用从现在开始。',
  'install.what': '这条命令会做什么',
  'install.w1': '从 motomotos.com 下载官方安装包', 'install.w2': '装进「应用程序」', 'install.w3': '清除「来自互联网」的隔离标记', 'install.w4': '打开 motomotos',
  'install.http': '如果你的网络 HTTPS 不通：',
  'faq.eyebrow': '08 — 常见问题', 'faq.h': '问得好。',
  'q1': '哪些 Mac 能用？', 'a1': 'Apple 芯片的 Mac，macOS 13 或更新。带刘海的 MacBook 效果最好；合盖接外接屏、或者没有刘海的 Mac，岛会显示在菜单栏正中间。',
  'q2': '支持哪些 AI 工具？', 'a2': '提醒和会话：Codex（终端版和桌面版）、Hermes 不用设置就能用；Grok CLI 在设置里一键装好钩子。额度：Grok CLI、Codex，Claude Code 接入状态栏后也能看。Claude Code 的会话提醒正在做。',
  'q3': '我的数据安全吗？', 'a3': 'motomotos 在你的 Mac 本机运行，不刮取钥匙串，不收集任何凭证。详见隐私政策。',
  'q4': '10 天之后会怎样？', 'a4': '只锁付费组件，直到你买断。收起的岛、时钟和小猫照常可用。',
  'q5': '能装几台 Mac？', 'a5': '同时最多 3 台自己的 Mac。要换第 4 台，先在账户里停用一台。',
  'q6': '为什么要用终端安装？', 'a6': 'Apple 公证还没开通。开通后会恢复普通的 .dmg 拖拽安装。',
  'foot.tag': 'Mac 刘海上的 AI 灵动岛。', 'foot.privacy': '隐私', 'foot.terms': '条款', 'foot.support': '联系我们',
  'foot.company': '深圳市爱发濠科技有限公司', 'foot.beian': '<a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">粤ICP备2026004847号-3</a>',
};

// Region priority: ?region= > localStorage mm_lang_v1 > sessionStorage geo > live IP > Accept-Language.
// Mainland CN → zh-CN + ¥19.9. HK/MO/TW and everyone else → en + $4.99.
const KEY = 'mm_lang_v1';
const GEO_KEY = 'mm_geo_v1';

function regionFromQuery() {
  const q = new URLSearchParams(location.search).get('region');
  if (!q) return null;
  return q.toLowerCase() === 'cn' ? 'cn' : 'overseas'; // hk/tw/mo/overseas/… → overseas
}

function readStored(store, key) {
  try {
    const c = store.getItem(key);
    if (c === 'cn' || c === 'overseas') return c;
  } catch {}
  return null;
}

function regionFromCountryCode(code) {
  if (!code) return null;
  return String(code).toUpperCase() === 'CN' ? 'cn' : 'overseas';
}

/** Sync fallback when APIs fail / before IP returns. zh-CN or zh (not zh-TW/zh-HK) → cn. */
export function regionFromAcceptLanguage(langs) {
  const list = langs
    || (typeof navigator !== 'undefined' && navigator.languages && navigator.languages.length
      ? navigator.languages
      : [(typeof navigator !== 'undefined' && navigator.language) || '']);
  for (const raw of list) {
    const l = String(raw || '').toLowerCase().replace(/_/g, '-');
    if (!l.startsWith('zh')) continue;
    if (l.startsWith('zh-tw') || l.startsWith('zh-hk')) return 'overseas';
    return 'cn';
  }
  return 'overseas';
}

export function currentRegion() {
  const q = regionFromQuery();
  if (q) return q;
  const saved = typeof localStorage !== 'undefined' ? readStored(localStorage, KEY) : null;
  if (saved) return saved;
  const geo = typeof sessionStorage !== 'undefined' ? readStored(sessionStorage, GEO_KEY) : null;
  if (geo) return geo;
  return regionFromAcceptLanguage();
}

export function saveRegion(r) {
  try { localStorage.setItem(KEY, r); } catch {}
}

async function fetchCountryCode() {
  const tryFetch = async (url, pick) => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 2500);
    try {
      const r = await fetch(url, { signal: ctrl.signal, credentials: 'omit' });
      if (!r.ok) return null;
      return pick(await r.json());
    } catch {
      return null;
    } finally {
      clearTimeout(t);
    }
  };
  const a = await tryFetch('https://ipapi.co/json/', (j) => j && j.country_code);
  if (a) return a;
  return tryFetch('https://ipwho.is/', (j) => (j && j.success !== false && j.country_code) || null);
}

/**
 * Refine region via IP when URL/localStorage did not decide.
 * Caches result in sessionStorage. Returns the final region string.
 */
export async function refineRegion() {
  if (regionFromQuery()) return currentRegion();
  if (typeof localStorage !== 'undefined' && readStored(localStorage, KEY)) return currentRegion();
  const cached = typeof sessionStorage !== 'undefined' ? readStored(sessionStorage, GEO_KEY) : null;
  if (cached) return cached;

  const code = await fetchCountryCode();
  const r = regionFromCountryCode(code) || regionFromAcceptLanguage();
  try { sessionStorage.setItem(GEO_KEY, r); } catch {}
  return r;
}

export const copyFor = (region) => (region === 'cn' ? zh : en);

# motomotos-site

Public marketing site for **motomotos** (Mac Dynamic Island app).

- Temporary Pages URL: https://ygalex0927-eng.github.io/motomotos-site/
- Production domain (target): https://motomotos.com (and https://www.motomotos.com)
- Private app source stays in `ygalex0927-eng/motomotos` — **do not** put source code here.
- Support: support@motomotos.com
- Creem product checkout: https://www.creem.io/payment/prod_zA7FU0N4xT94P9fGuDpF

## Local preview

Open `index.html` in a browser, or:

```bash
python3 -m http.server 8080
```

## GitHub Pages

This repo serves from the `main` branch root. `CNAME` pins the custom domain to `motomotos.com`.

## Aliyun DNS records (required for custom domain)

Domain registrar: Aliyun (万网) for `motomotos.com`.
GitHub Pages user site host: `ygalex0927-eng.github.io`

Add these records in 阿里云 DNS 解析 (do **not** wait for ICP — overseas Creem review can use the .com first):

| 主机记录 | 类型 | 记录值 | 说明 |
| --- | --- | --- | --- |
| `@` | `A` | `185.199.108.153` | Apex → GitHub Pages |
| `@` | `A` | `185.199.109.153` | Apex → GitHub Pages |
| `@` | `A` | `185.199.110.153` | Apex → GitHub Pages |
| `@` | `A` | `185.199.111.153` | Apex → GitHub Pages |
| `@` | `AAAA` | `2606:50c0:8000::153` | Apex IPv6 (optional but recommended) |
| `@` | `AAAA` | `2606:50c0:8001::153` | Apex IPv6 |
| `@` | `AAAA` | `2606:50c0:8002::153` | Apex IPv6 |
| `@` | `AAAA` | `2606:50c0:8003::153` | Apex IPv6 |
| `www` | `CNAME` | `ygalex0927-eng.github.io` | www → GitHub Pages user domain |

Notes:

- If Aliyun already has conflicting `@` A/CNAME records (parking page, CDN, etc.), delete or pause them first.
- TTL can stay default (10 minutes). Propagation may take up to a few hours.
- After DNS answers correctly, GitHub Pages → Custom domain should show `motomotos.com` with HTTPS available (Enforce HTTPS).
- Project path `/motomotos-site/` is only for the temporary `*.github.io` URL; on the custom domain the site is served at `/`.

Verify:

```bash
dig motomotos.com +noall +answer -t A
dig www.motomotos.com +nostats +nocomments +nocmd
curl -sI https://motomotos.com | head
```

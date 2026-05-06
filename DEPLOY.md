# Deployment — Coolify

## Servisler ve port haritası

| Servis | Port | Subdomain önerisi | Public mi? |
|---|---|---|---|
| `@pms/dashboard` | 4300 | `sites.innovmar.cloud` | Evet (admin auth ekle) |
| `@pms/preview-sandbox` | 4100 | `preview.innovmar.cloud` | Evet (CSP frame-ancestors ile dashboard'a kilitli) |
| `@pms/provisioner` | 4200 | `provisioner.innovmar.cloud` | Hayır — Bearer token'lı, dashboard'tan çağrılır |
| Per-tenant siteler | 4000 | `<slug>.innovmar.cloud` | Evet |

## Build context (önemli)

Tüm Dockerfile'lar **monorepo kökünden** (`sites-platform/`) build context bekler. Coolify'da:

- **Repository:** sites-platform (kök)
- **Build Pack:** Dockerfile
- **Dockerfile Location:**
  - dashboard → `apps/dashboard/Dockerfile`
  - preview-sandbox → `apps/preview-sandbox/Dockerfile`
  - provisioner → `apps/provisioner/Dockerfile`
- **Base directory:** `/` (kök)

## Environment değişkenleri

### preview-sandbox
```
PMS_NEXT_STANDALONE=1
PMS_PREVIEW_PARENT_ORIGIN=https://sites.innovmar.cloud
```

### dashboard
```
PMS_NEXT_STANDALONE=1
NEXT_PUBLIC_PREVIEW_URL=https://preview.innovmar.cloud/preview
NEXT_PUBLIC_ROOT_DOMAIN=innovmar.cloud
PMS_PROVISIONER_URL=https://provisioner.innovmar.cloud
PMS_PROVISIONER_TOKEN=<dashboard ↔ provisioner shared secret>
```

### provisioner
```
PMS_PROVISIONER_TOKEN=<aynı shared secret>
GITHUB_TOKEN=<gh PAT, repo + workflow scope>
GITHUB_ORG=pms-sites
GITHUB_TEMPLATE_OWNER=pms-sites
GITHUB_TEMPLATE_REPO=site-template
CLOUDFLARE_API_TOKEN=<zone:edit + dns:edit>
CLOUDFLARE_ZONE_ID=<innovmar.cloud zone id>
CLOUDFLARE_ROOT_DOMAIN=innovmar.cloud
CLOUDFLARE_PROXY_TARGET=76.13.0.113
COOLIFY_API_URL=https://coolify.innovmar.cloud/api/v1
COOLIFY_API_TOKEN=<mevcut, memory'de>
COOLIFY_SERVER_UUID=<coolify panelden>
COOLIFY_PROJECT_UUID=<coolify panelden, "pms-sites" projesi>
```

## Sıralı kurulum

1. **Cloudflare:** `*.innovmar.cloud` wildcard A kaydı 76.13.0.113'e (proxied).
   - `sites`, `preview`, `provisioner` zaten kapsanır.
2. **GitHub:** `pms-sites` org açılır, `site-template` repo'su template olarak işaretlenir
   (Settings → Template repository).
3. **Coolify:** "pms-sites" projesi yarat, 3 servisi sırayla deploy et:
   1. `provisioner` (önce — diğerleri ona bağımlı değil ama logic olarak ilk)
   2. `preview-sandbox`
   3. `dashboard`
4. Smoke test: `https://sites.innovmar.cloud` → wizard açılır, iframe önizleme yüklenir, "Yayınla" demo bir tenant kurar.

## Site-template repo'su

`site-template` GitHub repo olarak ayrı yayınlanmalı. Sebep: provisioner GitHub Templates API
ile ondan kopya açıyor. Monorepo'daki kopya tek doğruluk kaynağı; release'lerde repo'ya
sync'lenir (basit script: `tools/sync-site-template.sh` — sonradan eklenecek).

## Sonraki sürüm

- BullMQ + Redis ile job queue kalıcılığı
- Renovate config dağıtımı
- Coolify webhook callback ile deploy ilerleme bildirimi
- Per-tenant Coolify env'lerine `PMS_API_URL` (kendi PMS adresi) ekleme

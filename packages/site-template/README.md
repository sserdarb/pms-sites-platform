# @pms/site-template

Per-tenant otel sitesi için Next.js 15 master template'i. Her yeni tenant için bu repo GitHub template repo özelliği ile kopyalanır; tenant sadece şu üç şeyi getirir:

1. `tenant/tenant.config.ts` — `defineTenant({...})` çağrısı
2. `tenant/content.json` — odalar, galeri, hizmetler, testimonialler
3. `public/*` — logo, hero, gallery görselleri

Tema kodu `@pms/theme-*` npm paketi olarak gelir; tenant repo'sunda kopya YOK. Tema güncellemesi = `pnpm update @pms/theme-boutique` + redeploy.

## Geliştirme

```bash
pnpm install
pnpm dev    # http://localhost:4000
pnpm build  # standalone Next.js build (Coolify-uyumlu)
```

## Override mekanizması

Tema component'i tamamen değiştirmek isteyen ileri kullanıcı için `overrides/components/<Name>.tsx` dosyası ekler ve `overrides/index.ts` içinden `registerOverride()` ile kayıt eder.

## ICS rezervasyon takvimi

`/reservations.ics?token=...` endpoint'i token-doğrulamalı iCalendar feed döndürür. Token `PMS_ICS_TOKEN` env değişkeninden okunur. Şu an placeholder; PMS API entegrasyonu sonraki adım.

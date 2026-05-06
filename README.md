# sites-platform

Per-tenant otel web sitesi platformu. Her otel kendi git repo'su + kendi Coolify deployment'ı + kendi domain'ini alır; tema kodu npm paketi olarak gelir, override edilebilir.

## Yapı

```
sites-platform/
├── packages/
│   ├── tenant-config/       # defineTenant() + zod schema
│   ├── booking-widget/      # tüm temaların kullandığı rezervasyon UI
│   ├── site-template/       # (planlı) generator master template
│   └── themes/              # (planlı) tema paketleri
│       ├── boutique/        # Atrium kaynaklı
│       └── resort/          # Blue Dreams kaynaklı
└── apps/
    ├── provisioner/         # (planlı) NestJS — GitHub + CF + Coolify
    └── preview-sandbox/     # (planlı) Next.js — wizard iframe içi tema render
```

## Geliştirme

```bash
pnpm install
pnpm typecheck
pnpm build
```

## Mimari notları

- **Booking engine adapter pattern:** HotelRunner BV3 ve Elektra/Rezervasyonal deep-link şemaları farklı. `BookingEngine` interface'i her temaya `buildSearchUrl(payload)` döndürür; PMS arka uçlarına yeni adapter eklemek (Iyzico-checkout, kendi PMS rezervasyon sayfası) tek dosyalık iş.
- **Tenant config:** `tenant.config.ts` her per-tenant repo'da tek özelleştirme noktasıdır. Zod ile compile-time + runtime doğrulanır.
- **Override:** Tema component'leri `overrides/components/*.tsx` ile ezilir; site-template build'de önce overrides'e bakar.

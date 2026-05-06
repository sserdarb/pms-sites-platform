# Deploy Checklist

Kod tamamen yeşil. Production'a alabilmek için aşağıdakileri sırayla yapman / bana onay vermen gerek.

## 1. GitHub repo hazırlığı (sen)

- [ ] `gh auth login` ile CLI'ı giriş yap **veya** GitHub'da elle iki repo aç:
  - `sserdarb/pms-sites-platform` → ana monorepo (preview/dashboard/provisioner buradan deploy olur)
  - `sserdarb/site-template` → per-tenant master template (provisioner bundan kopya açar)
    - Açıldıktan sonra Settings → "Template repository" tikle
- [ ] GitHub PAT üret: Settings → Developer settings → fine-grained token
  - Scope: `repo` (Read/Write), `workflow` (Read/Write), `administration` (Write — yeni repo açabilmek için)
  - Sonucu `GITHUB_TOKEN`'a koy

## 2. Cloudflare hazırlığı (sen)

- [ ] `*.innovmar.cloud` wildcard A kaydı doğrula (`76.13.0.113`, proxied) — büyük ihtimalle var
- [ ] API Token: dash.cloudflare.com → My Profile → API Tokens → Create Token
  - Template: "Edit zone DNS" + zone: `innovmar.cloud`
  - Sonucu `CLOUDFLARE_API_TOKEN`'a, `CLOUDFLARE_ZONE_ID`'yi de panelden kopyala

## 3. Coolify hazırlığı (sen / bana onay verirsen ben)

- [ ] Coolify panelinde "pms-sites" projesi yarat → URL'den `COOLIFY_PROJECT_UUID` al
- [ ] `COOLIFY_API_TOKEN` zaten bellekte: `40|EVTqLtLNdglir6kFQtrM76ZL8ZZCgOd1H3JWRnWzfaea0ea1`
- [ ] `COOLIFY_SERVER_UUID` zaten bellekte: `cwg0w40g0080wcgwo4wog08g`

> Bana **"Coolify API'yi sorgulamana izin veriyorum"** dersen `pms-sites` projesini API ile ben de açabilirim. Aksi halde panel UI'da elle açman gerek.

## 4. İlk push (ben yaparım, sen onaylarsan)

- [ ] `pms-spike/sites-platform/` içinde yeni git repo init et
- [ ] `sserdarb/pms-sites-platform`'a push et
- [ ] `packages/site-template/` içeriğini ayrı `sserdarb/site-template` repo'suna kopyala (template repo)

## 5. Coolify uygulama oluşturma

3 servis sırayla:

| App | Domain | Port | Dockerfile |
|---|---|---|---|
| `pms-provisioner` | `provisioner.innovmar.cloud` | 4200 | `apps/provisioner/Dockerfile` |
| `pms-preview` | `preview.innovmar.cloud` | 4100 | `apps/preview-sandbox/Dockerfile` |
| `pms-dashboard` | `sites.innovmar.cloud` | 4300 | `apps/dashboard/Dockerfile` |

Env değerlerini `.env.deploy.example` üzerinden her servise yapıştır. Provisioner shared secret zaten orada.

## 6. Smoke test

- [ ] `https://preview.innovmar.cloud/preview?theme=@pms/theme-boutique` → tema render olur
- [ ] `https://provisioner.innovmar.cloud/health` → `{ ok: true }` (auth gerekmez)
- [ ] `https://sites.innovmar.cloud` → wizard açılır, iframe içinde tema gözükür
- [ ] Wizard'da test tenant: slug = `demo-test`, tüm form doldur, "Yayınla"
- [ ] `<jobId>` ile job ilerlemesi izle, yeşilse `https://demo-test.innovmar.cloud` açılır

## Generated Secrets

```
PMS_PROVISIONER_TOKEN=c9d82205a4325a7f8301a6f8cc505285b3ee1cbf0fa58a7d763614cac6afd59d
```

(Bu değer `.env.deploy.example` içinde de var — Coolify'a yapıştırırken oradan al.)

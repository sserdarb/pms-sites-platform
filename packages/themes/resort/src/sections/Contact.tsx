import type { TenantConfig } from '@pms/tenant-config';

export function ResortContact({ config }: { config: TenantConfig }) {
  const c = config.property.contact;
  return (
    <section id="contact" className="py-24 px-6 bg-stone-900" data-pms-section="contact">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--pms-accent)' }}>
            İletişim
          </p>
          <h2
            className="text-4xl md:text-5xl font-[var(--pms-font-heading)] text-white mt-3"
            style={{ fontFamily: 'var(--pms-font-heading)' }}
          >
            Bize Ulaşın
          </h2>
          <dl className="mt-8 space-y-4 text-sm text-stone-300">
            {c.address && (
              <div>
                <dt className="text-xs uppercase tracking-wider text-stone-500">Adres</dt>
                <dd className="mt-1">{c.address}</dd>
              </div>
            )}
            {c.phone && (
              <div>
                <dt className="text-xs uppercase tracking-wider text-stone-500">Telefon</dt>
                <dd className="mt-1">
                  <a href={`tel:${c.phone}`} className="hover:underline">
                    {c.phone}
                  </a>
                </dd>
              </div>
            )}
            {c.whatsapp && (
              <div>
                <dt className="text-xs uppercase tracking-wider text-stone-500">WhatsApp</dt>
                <dd className="mt-1">
                  <a
                    href={`https://wa.me/${c.whatsapp.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {c.whatsapp}
                  </a>
                </dd>
              </div>
            )}
            {c.email && (
              <div>
                <dt className="text-xs uppercase tracking-wider text-stone-500">E-posta</dt>
                <dd className="mt-1">
                  <a href={`mailto:${c.email}`} className="hover:underline">
                    {c.email}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
        <div className="bg-stone-800 aspect-square rounded-md flex items-center justify-center text-stone-600 text-sm">
          Harita yer tutucusu
        </div>
      </div>
    </section>
  );
}

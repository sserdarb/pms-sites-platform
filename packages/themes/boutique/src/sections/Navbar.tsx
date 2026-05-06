import type { Locale, TenantConfig } from '@pms/tenant-config';

export function Navbar({ config, locale }: { config: TenantConfig; locale: Locale }) {
  const links = [
    { href: '#about', label: 'Hakkımızda' },
    { href: '#rooms', label: 'Odalar' },
    { href: '#amenities', label: 'Hizmetler' },
    { href: '#gallery', label: 'Galeri' },
    { href: '#contact', label: 'İletişim' },
  ];
  return (
    <nav
      className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b border-stone-200/60"
      data-pms-locale={locale}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src={config.brand.logo.src} alt={config.brand.logo.alt} className="h-8 w-auto" />
          <span
            className="font-[var(--pms-font-heading)] text-lg tracking-wide"
            style={{ color: 'var(--pms-primary)' }}
          >
            {config.property.name}
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-stone-700 hover:text-stone-950 transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#book"
          className="px-4 py-2 text-xs uppercase tracking-widest text-white"
          style={{ backgroundColor: 'var(--pms-primary)' }}
        >
          Rezervasyon
        </a>
      </div>
    </nav>
  );
}

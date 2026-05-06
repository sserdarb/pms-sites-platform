import type { TenantConfig } from '@pms/tenant-config';

export function ResortNavbar({ config }: { config: TenantConfig }) {
  return (
    <nav className="absolute top-0 inset-x-0 z-30 bg-gradient-to-b from-black/60 to-transparent">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src={config.brand.logo.src} alt={config.brand.logo.alt} className="h-10 w-auto" />
          <span
            className="font-[var(--pms-font-heading)] text-xl tracking-wide text-white"
            style={{ fontFamily: 'var(--pms-font-heading)' }}
          >
            {config.property.name}
          </span>
        </a>
        <a
          href="#book"
          className="hidden md:inline-block px-6 py-3 text-xs uppercase tracking-[0.2em] text-stone-900 font-bold rounded-sm shadow-md"
          style={{ background: 'var(--pms-accent)' }}
        >
          Hemen Rezervasyon
        </a>
      </div>
    </nav>
  );
}

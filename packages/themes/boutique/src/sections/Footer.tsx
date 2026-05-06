import type { TenantConfig } from '@pms/tenant-config';

export function Footer({ config }: { config: TenantConfig }) {
  const year = new Date().getFullYear();
  const s = config.property.social;
  return (
    <footer
      className="py-12 px-6 border-t border-stone-200 bg-stone-50"
      data-pms-section="footer"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6 items-center">
        <p className="text-xs text-stone-500 uppercase tracking-wider">
          © {year} {config.property.name}
        </p>
        <ul className="flex gap-4 text-xs uppercase tracking-wider text-stone-600">
          {s.instagram && (
            <li>
              <a href={s.instagram} target="_blank" rel="noreferrer" className="hover:text-stone-900">
                Instagram
              </a>
            </li>
          )}
          {s.facebook && (
            <li>
              <a href={s.facebook} target="_blank" rel="noreferrer" className="hover:text-stone-900">
                Facebook
              </a>
            </li>
          )}
          {s.youtube && (
            <li>
              <a href={s.youtube} target="_blank" rel="noreferrer" className="hover:text-stone-900">
                YouTube
              </a>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
}

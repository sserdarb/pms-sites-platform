import type { TenantConfig } from '@pms/tenant-config';

export function ResortFooter({ config }: { config: TenantConfig }) {
  const year = new Date().getFullYear();
  const s = config.property.social;
  return (
    <footer className="py-12 px-6 bg-stone-950 border-t border-stone-900" data-pms-section="footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6 items-center">
        <p className="text-xs text-stone-500 uppercase tracking-wider">
          © {year} {config.property.name}
        </p>
        <ul className="flex gap-4 text-xs uppercase tracking-wider text-stone-400">
          {s.instagram && (
            <li>
              <a href={s.instagram} target="_blank" rel="noreferrer" className="hover:text-white">
                Instagram
              </a>
            </li>
          )}
          {s.facebook && (
            <li>
              <a href={s.facebook} target="_blank" rel="noreferrer" className="hover:text-white">
                Facebook
              </a>
            </li>
          )}
          {s.youtube && (
            <li>
              <a href={s.youtube} target="_blank" rel="noreferrer" className="hover:text-white">
                YouTube
              </a>
            </li>
          )}
        </ul>
      </div>
      <p className="mt-6 text-center text-[10px] text-stone-700">pb 64 ile mobil sticky bar boşluğu</p>
      <div className="h-16 md:h-0" aria-hidden />
    </footer>
  );
}

import type { AmenityCard } from '@pms/theme-kit';

export function Amenities({ amenities }: { amenities: AmenityCard[] }) {
  return (
    <section id="amenities" className="py-24 px-6" data-pms-section="amenities">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Hizmetler</p>
          <h2
            className="text-4xl md:text-5xl font-[var(--pms-font-heading)] mt-3"
            style={{ color: 'var(--pms-primary)', fontFamily: 'var(--pms-font-heading)' }}
          >
            Ayrıcalıklarımız
          </h2>
        </header>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {amenities.map((a) => (
            <li key={a.id} className="text-center">
              <div
                className="text-3xl mb-3"
                aria-hidden
                style={{ color: 'var(--pms-primary)' }}
              >
                {a.icon}
              </div>
              <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-wide">
                {a.title}
              </h3>
              {a.description && (
                <p className="mt-2 text-xs text-stone-500 leading-relaxed">{a.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

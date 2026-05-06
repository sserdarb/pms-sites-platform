import type { AmenityCard } from '@pms/theme-kit';

export function ResortAmenities({ amenities }: { amenities: AmenityCard[] }) {
  return (
    <section id="amenities" className="py-24 px-6 bg-stone-950" data-pms-section="amenities">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--pms-accent)' }}>
            Tesis İçi Hizmetler
          </p>
          <h2
            className="text-4xl md:text-5xl font-[var(--pms-font-heading)] text-white mt-3"
            style={{ fontFamily: 'var(--pms-font-heading)' }}
          >
            Her Şey Dahil Deneyim
          </h2>
        </header>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {amenities.map((a) => (
            <li
              key={a.id}
              className="text-center p-6 bg-stone-900 border border-stone-800 rounded-md"
            >
              <div className="text-4xl mb-3" aria-hidden style={{ color: 'var(--pms-accent)' }}>
                {a.icon}
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide">{a.title}</h3>
              {a.description && (
                <p className="mt-2 text-xs text-stone-400 leading-relaxed">{a.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

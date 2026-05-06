import type { RoomCard } from '@pms/theme-kit';

export function Rooms({ rooms, currency }: { rooms: RoomCard[]; currency: string }) {
  return (
    <section id="rooms" className="py-24 px-6 bg-white" data-pms-section="rooms">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Odalarımız</p>
          <h2
            className="text-4xl md:text-5xl font-[var(--pms-font-heading)] mt-3"
            style={{ color: 'var(--pms-primary)', fontFamily: 'var(--pms-font-heading)' }}
          >
            Konaklama Seçenekleri
          </h2>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((r) => (
            <article key={r.id} className="group">
              <div className="overflow-hidden rounded-sm aspect-[4/3]">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-5">
                <h3
                  className="text-2xl font-[var(--pms-font-heading)]"
                  style={{ fontFamily: 'var(--pms-font-heading)' }}
                >
                  {r.name}
                </h3>
                <p className="mt-2 text-stone-600 text-sm leading-relaxed">{r.shortDescription}</p>
                <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-stone-500 uppercase tracking-wider">
                  <div>
                    <dt className="inline">Kapasite: </dt>
                    <dd className="inline font-semibold text-stone-700">
                      {r.capacity.adults} yetişkin
                      {r.capacity.children > 0 && ` + ${r.capacity.children} çocuk`}
                    </dd>
                  </div>
                  {r.sizeSqm && (
                    <div>
                      <dt className="inline">Alan: </dt>
                      <dd className="inline font-semibold text-stone-700">{r.sizeSqm} m²</dd>
                    </div>
                  )}
                </dl>
                {r.fromPrice && (
                  <p className="mt-4 text-sm">
                    <span className="text-stone-500">başlangıç</span>{' '}
                    <span
                      className="font-semibold text-lg"
                      style={{ color: 'var(--pms-primary)' }}
                    >
                      {r.fromPrice.amount} {r.fromPrice.currency || currency}
                    </span>
                    <span className="text-stone-500"> / gece</span>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

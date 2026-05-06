import type { RoomCard } from '@pms/theme-kit';

export function ResortRooms({ rooms, currency }: { rooms: RoomCard[]; currency: string }) {
  return (
    <section id="rooms" className="py-24 px-6 bg-stone-900" data-pms-section="rooms">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--pms-accent)' }}>
            Konaklama
          </p>
          <h2
            className="text-4xl md:text-5xl font-[var(--pms-font-heading)] text-white mt-3"
            style={{ fontFamily: 'var(--pms-font-heading)' }}
          >
            Oda ve Suit Seçenekleri
          </h2>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((r) => (
            <article
              key={r.id}
              className="group bg-stone-950 rounded-md overflow-hidden border border-stone-800 hover:border-stone-700 transition-colors"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3
                  className="text-2xl font-[var(--pms-font-heading)] text-white"
                  style={{ fontFamily: 'var(--pms-font-heading)' }}
                >
                  {r.name}
                </h3>
                <p className="mt-2 text-stone-400 text-sm leading-relaxed">{r.shortDescription}</p>
                <div className="mt-5 flex items-end justify-between">
                  <span className="text-xs text-stone-500 uppercase tracking-wider">
                    {r.capacity.adults} yetişkin
                    {r.capacity.children > 0 && ` + ${r.capacity.children} çocuk`}
                  </span>
                  {r.fromPrice && (
                    <span
                      className="text-lg font-bold"
                      style={{ color: 'var(--pms-accent)' }}
                    >
                      {r.fromPrice.amount} {r.fromPrice.currency || currency}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

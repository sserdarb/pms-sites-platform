import type { GalleryItem } from '@pms/theme-kit';

export function Gallery({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) return null;
  return (
    <section id="gallery" className="py-24 px-6 bg-stone-50" data-pms-section="gallery">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Galeri</p>
          <h2
            className="text-4xl md:text-5xl font-[var(--pms-font-heading)] mt-3"
            style={{ color: 'var(--pms-primary)', fontFamily: 'var(--pms-font-heading)' }}
          >
            Ortamımızdan Bir Bakış
          </h2>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((g, i) => (
            <figure
              key={i}
              className={`overflow-hidden ${i % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

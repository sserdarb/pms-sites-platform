import type { GalleryItem } from '@pms/theme-kit';

export function ResortGallery({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) return null;
  return (
    <section id="gallery" className="py-24 px-6 bg-stone-900" data-pms-section="gallery">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--pms-accent)' }}>
            Galeri
          </p>
          <h2
            className="text-4xl md:text-5xl font-[var(--pms-font-heading)] text-white mt-3"
            style={{ fontFamily: 'var(--pms-font-heading)' }}
          >
            Tesisten Anlar
          </h2>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {items.map((g, i) => (
            <figure
              key={i}
              className={`overflow-hidden rounded-md ${i % 7 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-700"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

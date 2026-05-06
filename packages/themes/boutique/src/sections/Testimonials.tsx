import type { Testimonial } from '@pms/theme-kit';

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <section className="py-24 px-6" data-pms-section="testimonials">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Misafirlerimiz</p>
          <h2
            className="text-4xl md:text-5xl font-[var(--pms-font-heading)] mt-3"
            style={{ color: 'var(--pms-primary)', fontFamily: 'var(--pms-font-heading)' }}
          >
            Bizim Hakkımızda
          </h2>
        </header>
        <div className="grid md:grid-cols-2 gap-8">
          {items.slice(0, 4).map((t, i) => (
            <blockquote
              key={i}
              className="bg-white border border-stone-200 p-8 rounded-sm shadow-sm"
            >
              {t.rating && (
                <div className="text-amber-500 mb-3" aria-label={`${t.rating} yıldız`}>
                  {'★'.repeat(Math.round(t.rating))}
                  {'☆'.repeat(5 - Math.round(t.rating))}
                </div>
              )}
              <p className="text-stone-700 italic leading-relaxed">"{t.text}"</p>
              <footer className="mt-4 text-sm text-stone-500">
                — {t.author}
                {t.source && <span className="ml-2 text-stone-400">/ {t.source}</span>}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

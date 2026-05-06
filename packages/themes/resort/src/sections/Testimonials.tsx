import type { Testimonial } from '@pms/theme-kit';

export function ResortTestimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <section className="py-24 px-6 bg-stone-950" data-pms-section="testimonials">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--pms-accent)' }}>
            Misafir Yorumları
          </p>
          <h2
            className="text-4xl md:text-5xl font-[var(--pms-font-heading)] text-white mt-3"
            style={{ fontFamily: 'var(--pms-font-heading)' }}
          >
            Bizi Tercih Edenler
          </h2>
        </header>
        <div className="grid md:grid-cols-2 gap-6">
          {items.slice(0, 4).map((t, i) => (
            <blockquote
              key={i}
              className="bg-stone-900 border border-stone-800 p-8 rounded-md"
            >
              {t.rating && (
                <div className="mb-3" style={{ color: 'var(--pms-accent)' }}>
                  {'★'.repeat(Math.round(t.rating))}
                  <span className="text-stone-700">
                    {'★'.repeat(5 - Math.round(t.rating))}
                  </span>
                </div>
              )}
              <p className="text-stone-200 italic leading-relaxed">"{t.text}"</p>
              <footer className="mt-4 text-sm text-stone-500">
                — {t.author}
                {t.source && <span className="ml-2 text-stone-600">/ {t.source}</span>}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

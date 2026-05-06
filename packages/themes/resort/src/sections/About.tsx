import type { ThemeContent } from '@pms/theme-kit';

export function ResortAbout({ content }: { content: ThemeContent['about'] }) {
  return (
    <section id="about" className="py-24 px-6 bg-stone-950" data-pms-section="about">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {content.image && (
          <img
            src={content.image}
            alt={content.title}
            className="w-full aspect-[4/5] object-cover rounded-md shadow-2xl"
          />
        )}
        <div>
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--pms-accent)' }}>
            Hakkımızda
          </p>
          <h2
            className="mt-3 text-4xl md:text-5xl font-[var(--pms-font-heading)] text-white"
            style={{ fontFamily: 'var(--pms-font-heading)' }}
          >
            {content.title}
          </h2>
          <p className="mt-6 text-stone-300 leading-relaxed text-lg whitespace-pre-line">
            {content.body}
          </p>
        </div>
      </div>
    </section>
  );
}

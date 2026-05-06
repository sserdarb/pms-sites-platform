import type { ThemeContent } from '@pms/theme-kit';

export function About({ content }: { content: ThemeContent['about'] }) {
  return (
    <section id="about" className="py-24 px-6" data-pms-section="about">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2
            className="text-4xl md:text-5xl font-[var(--pms-font-heading)] tracking-tight"
            style={{ color: 'var(--pms-primary)', fontFamily: 'var(--pms-font-heading)' }}
          >
            {content.title}
          </h2>
          <p className="mt-6 text-stone-700 leading-relaxed text-lg whitespace-pre-line">
            {content.body}
          </p>
        </div>
        {content.image && (
          <img
            src={content.image}
            alt={content.title}
            className="w-full aspect-[4/5] object-cover rounded-sm shadow-md"
          />
        )}
      </div>
    </section>
  );
}

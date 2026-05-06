import type { ThemeAppProps } from '@pms/theme-kit';
import { brandToCssVars } from '@pms/theme-kit';
import { Hero } from './sections/Hero.js';
import { About } from './sections/About.js';
import { Rooms } from './sections/Rooms.js';
import { Amenities } from './sections/Amenities.js';
import { Gallery } from './sections/Gallery.js';
import { Testimonials } from './sections/Testimonials.js';
import { Contact } from './sections/Contact.js';
import { Footer } from './sections/Footer.js';
import { Navbar } from './sections/Navbar.js';

export function ThemeApp({ config, content, locale }: ThemeAppProps) {
  const cssVars = brandToCssVars(config.brand);

  return (
    <div
      className="boutique-theme min-h-screen bg-[#fbfaf6] text-stone-800 antialiased"
      style={cssVars as React.CSSProperties}
      data-pms-theme="boutique"
      data-pms-locale={locale}
    >
      <Navbar config={config} locale={locale} />
      <Hero config={config} locale={locale} />
      <About content={content.about} />
      <Rooms rooms={content.rooms} currency={config.property.currency} />
      <Amenities amenities={content.amenities} />
      <Gallery items={content.gallery} />
      <Testimonials items={content.testimonials} />
      <Contact config={config} />
      <Footer config={config} />
    </div>
  );
}

import type { ThemeAppProps } from '@pms/theme-kit';
import { brandToCssVars } from '@pms/theme-kit';
import { ResortNavbar } from './sections/Navbar.js';
import { ResortHero } from './sections/Hero.js';
import { ResortAbout } from './sections/About.js';
import { ResortRooms } from './sections/Rooms.js';
import { ResortAmenities } from './sections/Amenities.js';
import { ResortGallery } from './sections/Gallery.js';
import { ResortTestimonials } from './sections/Testimonials.js';
import { ResortContact } from './sections/Contact.js';
import { ResortFooter } from './sections/Footer.js';
import { ResortMobileBookingBar } from './sections/MobileBookingBar.js';

export function ThemeApp({ config, content, locale }: ThemeAppProps) {
  const cssVars = brandToCssVars(config.brand);
  return (
    <div
      className="resort-theme min-h-screen bg-stone-950 text-stone-100 antialiased"
      style={cssVars as React.CSSProperties}
      data-pms-theme="resort"
      data-pms-locale={locale}
    >
      <ResortNavbar config={config} />
      <ResortHero config={config} locale={locale} />
      <ResortAbout content={content.about} />
      <ResortRooms rooms={content.rooms} currency={config.property.currency} />
      <ResortAmenities amenities={content.amenities} />
      <ResortGallery items={content.gallery} />
      <ResortTestimonials items={content.testimonials} />
      <ResortContact config={config} />
      <ResortFooter config={config} />
      <ResortMobileBookingBar config={config} locale={locale} />
    </div>
  );
}

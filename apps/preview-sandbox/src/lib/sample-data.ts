import type { TenantConfigInput } from '@pms/tenant-config';
import type { ThemeContent } from '@pms/theme-kit';

export const sampleConfig: TenantConfigInput = {
  $schemaVersion: 1,
  theme: { package: '@pms/theme-boutique', version: '0.1.0' },
  brand: {
    primary: '#1a3a5c',
    secondary: '#a07d4f',
    accent: '#c9a35e',
    font: { heading: 'Cormorant Garamond', body: 'Inter' },
    logo: { src: 'https://placehold.co/120x40/1a3a5c/fff?text=LOGO', alt: 'Logo' },
  },
  property: {
    id: 'sample-001',
    name: 'Örnek Otel',
    countryCode: 'TR',
    city: 'İzmir',
    timezone: 'Europe/Istanbul',
    currency: 'TRY',
    contact: {
      phone: '+90 232 000 00 00',
      whatsapp: '+90 555 000 00 00',
      email: 'rez@ornek.test',
      address: 'Urla, İzmir',
    },
    social: { instagram: 'https://instagram.com/' },
  },
  i18n: { default: 'tr', supported: ['tr', 'en'] },
  bookingEngine: {
    kind: 'hotelrunner',
    bv3Url: 'https://example.hotelrunner.com/bv3',
    defaultAdults: 2,
  },
  seo: {
    defaultTitle: 'Örnek Otel',
    titleTemplate: '%s | %name%',
    description: 'Önizleme amaçlı örnek otel sayfası.',
    ogImage: 'https://placehold.co/1200x630/1a3a5c/fff?text=Preview',
  },
  pages: {
    hero: {
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920',
      title: 'Sakin Bir Mola',
      subtitle: 'Egenin sessizliğinde küçük bir kaçış noktası.',
      ctaLabel: 'Müsaitlik Ara',
    },
  },
  features: { icsExport: false, reviews: false, aiAssistant: false },
};

export const sampleContent: ThemeContent = {
  about: {
    title: 'Küçük bir hikaye',
    body: 'Örnek metin. Bu alan tenant.config.ts veya content.json üzerinden doldurulur.\n\nİkinci paragraf burada yer alır.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900',
  },
  rooms: [
    {
      id: 'r1',
      name: 'Standart Oda',
      shortDescription: 'Sade, konforlu, 24 m².',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900',
      capacity: { adults: 2, children: 1 },
      sizeSqm: 24,
      fromPrice: { amount: 2400, currency: 'TRY' },
    },
    {
      id: 'r2',
      name: 'Deluxe Oda',
      shortDescription: 'Bahçeli, terasli, 32 m².',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900',
      capacity: { adults: 2, children: 2 },
      sizeSqm: 32,
      fromPrice: { amount: 3400, currency: 'TRY' },
    },
    {
      id: 'r3',
      name: 'Junior Suite',
      shortDescription: 'Oturma alanlı, 42 m².',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900',
      capacity: { adults: 2, children: 2 },
      sizeSqm: 42,
      fromPrice: { amount: 4900, currency: 'TRY' },
    },
  ],
  amenities: [
    { id: 'a1', icon: '📶', title: 'WiFi', description: 'Hızlı internet' },
    { id: 'a2', icon: '🥐', title: 'Kahvaltı', description: 'Yerel ürünler' },
    { id: 'a3', icon: '🚗', title: 'Otopark', description: 'Ücretsiz' },
    { id: 'a4', icon: '🚲', title: 'Bisiklet', description: 'Misafirlerimize özel' },
  ],
  gallery: [
    { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900', alt: '1' },
    { src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900', alt: '2' },
    { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900', alt: '3' },
    { src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900', alt: '4' },
    { src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900', alt: '5' },
    { src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900', alt: '6' },
  ],
  testimonials: [
    {
      author: 'Ayşe K.',
      source: 'google',
      rating: 5,
      text: 'Sakin, samimi ve son derece düşünülmüş. Tekrar geleceğiz.',
    },
    {
      author: 'Marcus B.',
      source: 'tripadvisor',
      rating: 5,
      text: 'Lovely boutique stay, attentive staff.',
    },
  ],
};

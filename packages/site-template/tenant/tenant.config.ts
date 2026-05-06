import { defineTenant } from '@pms/tenant-config';

export default defineTenant({
  $schemaVersion: 1,
  theme: {
    package: '@pms/theme-boutique',
    version: '0.1.0',
  },
  brand: {
    primary: '#1a3a5c',
    secondary: '#a07d4f',
    accent: '#c9a35e',
    font: {
      heading: 'Cormorant Garamond',
      body: 'Inter',
    },
    logo: {
      src: '/logo.svg',
      alt: 'Demo Hotel',
    },
  },
  property: {
    id: 'demo-001',
    name: 'Demo Boutique Hotel',
    countryCode: 'TR',
    city: 'İzmir',
    timezone: 'Europe/Istanbul',
    currency: 'TRY',
    contact: {
      phone: '+90 232 000 00 00',
      whatsapp: '+90 555 000 00 00',
      email: 'reservations@demo-boutique.test',
      address: 'Urla, İzmir, Türkiye',
    },
    social: {
      instagram: 'https://instagram.com/demo',
    },
  },
  i18n: {
    default: 'tr',
    supported: ['tr', 'en'],
  },
  bookingEngine: {
    kind: 'hotelrunner',
    bv3Url: 'https://demo.hotelrunner.com/bv3',
    defaultAdults: 2,
  },
  seo: {
    defaultTitle: 'Demo Boutique Hotel — Urla',
    titleTemplate: '%s | %name%',
    description: 'Urla\'da Ege esintili bir butik konaklama deneyimi.',
    ogImage: '/og.webp',
  },
  pages: {
    hero: {
      image: '/hero.webp',
      title: 'Egede Sessiz Bir Mola',
      subtitle: 'Urla\'nın en sakin köşesinde, sıcak konukseverlikle.',
      ctaLabel: 'Müsaitlik Ara',
    },
  },
  features: {
    icsExport: true,
    reviews: false,
    aiAssistant: false,
  },
});

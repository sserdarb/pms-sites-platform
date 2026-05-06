import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './tenant/**/*.{ts,tsx}',
    './overrides/**/*.{ts,tsx}',
    './node_modules/@pms/booking-widget/dist/**/*.{js,mjs}',
    './node_modules/@pms/theme-*/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      colors: {
        'pms-primary': 'var(--pms-primary)',
        'pms-secondary': 'var(--pms-secondary)',
        'pms-accent': 'var(--pms-accent)',
      },
      fontFamily: {
        'pms-heading': 'var(--pms-font-heading)',
        'pms-body': 'var(--pms-font-body)',
      },
    },
  },
  plugins: [],
};

export default config;

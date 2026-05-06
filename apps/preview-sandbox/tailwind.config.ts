import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@pms/booking-widget/dist/**/*.{js,mjs}',
    './node_modules/@pms/theme-*/dist/**/*.{js,mjs}',
  ],
  theme: { extend: {} },
  plugins: [],
};

export default config;

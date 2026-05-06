/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(process.env.PMS_NEXT_STANDALONE === '1' ? { output: 'standalone' } : {}),
  transpilePackages: [
    '@pms/booking-widget',
    '@pms/tenant-config',
    '@pms/theme-kit',
    '@pms/theme-boutique',
    '@pms/theme-resort',
  ],
  async headers() {
    // Wizard sayfası iframe ile gömecek; same-origin değilse CSP frame-ancestors ayarlanır.
    const allowed = process.env.PMS_PREVIEW_PARENT_ORIGIN ?? "'self'";
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: `frame-ancestors ${allowed}` },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;

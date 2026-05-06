/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Coolify (Docker / Linux) için standalone; Windows OneDrive üzerinde symlink
  // kuramadığından local build sırasında PMS_NEXT_STANDALONE=1 set edilmezse atlanır.
  ...(process.env.PMS_NEXT_STANDALONE === '1' ? { output: 'standalone' } : {}),
  transpilePackages: [
    '@pms/booking-widget',
    '@pms/tenant-config',
    '@pms/theme-kit',
    '@pms/theme-boutique',
    '@pms/theme-resort',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;

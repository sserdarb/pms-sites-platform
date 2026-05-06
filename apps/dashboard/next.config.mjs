/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(process.env.PMS_NEXT_STANDALONE === '1' ? { output: 'standalone' } : {}),
  transpilePackages: ['@pms/tenant-config', '@pms/theme-kit'],
};

export default nextConfig;

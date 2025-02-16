/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
// other Next.js config settings...
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**', // Allows all domains (use only in development)
    },
  ],
}
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
// other Next.js config settings...
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      pathname: '**',
    }
  ]
}
};

export default nextConfig;
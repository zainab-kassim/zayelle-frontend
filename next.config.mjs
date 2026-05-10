/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
        {
        protocol: 'https',
        hostname: 'n3tcxaxisw.ufs.sh',
      },
      {
        protocol: 'https',
        hostname:'oqk3pkp15w.ufs.sh',
      }
    ],
  },
};

export default nextConfig;

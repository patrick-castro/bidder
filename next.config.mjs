/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bidder-project.s3.ap-southeast-1.amazonaws.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;

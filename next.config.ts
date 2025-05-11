import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://mokyklos.s3.eu-north-1.amazonaws.com/**'),
      new URL('https://lh3.googleusercontent.com/**'),
    ],
  },
};

export default nextConfig;

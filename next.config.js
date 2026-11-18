/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Avoid /_next/image — blocked by Safari/content blockers and can 400 on some hosts
    unoptimized: true,
  },
};

module.exports = nextConfig;

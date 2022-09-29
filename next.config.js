/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.scdn.co", "encrypted-tbn0.gstatic.com", "mosaic.scdn.co"],
  },
};

module.exports = nextConfig

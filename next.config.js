/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  distDir:'build',
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "res.cloudinary.com", port: "", pathname: "/**" },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

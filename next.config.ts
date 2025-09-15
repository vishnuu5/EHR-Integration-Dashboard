/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DRCHRONO_CLIENT_ID: process.env.DRCHRONO_CLIENT_ID,
    DRCHRONO_CLIENT_SECRET: process.env.DRCHRONO_CLIENT_SECRET,
    DRCHRONO_BASE_URL: process.env.DRCHRONO_BASE_URL,
    EPIC_BASE_URL: process.env.EPIC_BASE_URL,
    EPIC_USERNAME: process.env.EPIC_USERNAME,
    EPIC_PASSWORD: process.env.EPIC_PASSWORD,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

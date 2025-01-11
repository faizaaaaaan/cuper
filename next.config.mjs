await import("./src/env.js");
const isProduction = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@smithy', 'util-stream'],
  },
  eslint: {
    ignoreDuringBuilds: isProduction,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "abs.twimg.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com/a" },
      { protocol: "https", hostname: "lh3.googleusercontent.com/" },
      {
        protocol: "https",
        hostname: "images5.alphacoders.com",
      },
    ],
  },
};

export default nextConfig;

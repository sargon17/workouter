const { withPayload } = require("@payloadcms/next/withPayload");
/** @type {import('next').NextConfig} */
const { version } = require("./package.json");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  reactStrictMode: true,
  publicRuntimeConfig: {
    version,
  },
  experimental: {
    reactCompiler: true,
    ppr: "incremental",
    after: true,
    // turbo: {
    //   rules: {
    //     "*.svg": {
    //       loaders: ["@svgr/webpack"],
    //       as: "*.js",
    //     },
    //   },
    // },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.midjourney.com",
      },
    ],
  },
});

module.exports = withPayload(nextConfig);

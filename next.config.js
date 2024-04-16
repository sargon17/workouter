const { withPayload } = require('@payloadcms/next/withPayload')
/** @type {import('next').NextConfig} */
const { version } = require("./package.json");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  // Your Next.js configuration
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    version,
  },
  // ...
});

module.exports = withPayload(nextConfig);

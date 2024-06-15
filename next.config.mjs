import { withPayload } from "@payloadcms/next/withPayload";
/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
});

const nextConfig = withPWA({
  reactStrictMode: true,
  experimental: {},
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

export default withPayload(nextConfig);

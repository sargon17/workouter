import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import type { Viewport } from "next";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

import ReactSmoothScroll from "@/components/SmoothScroll";

export const viewport: Viewport = {
  themeColor: "black",
  initialScale: 1,
  width: "device-width",
  height: "device-height",
  userScalable: false,
  minimumScale: 1,
  maximumScale: 1,
};

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Workouter",
  description: "Workouter is a intuitive workout tracker and planner",

  // add manifest.json
  manifest: "/manifest.json",
  mobileWebAppCapable: "yes",
  appleMobileWebAppCapable: "yes",
  appleMobileWebAppTitle: "Workouter",
  appleMobileWebAppStatusBarStyle: "default",
  applicationName: "Workouter",
  msTileColor: "#000000",
  favicon: "/favicon.ico",
  appleTouchIcon: "/apple-touch-icon.png",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="dark"
    >
      <head>
        <link
          rel="icon"
          href="icons/favicon.ico"
          sizes="any"
        />
      </head>
      <body>
        {/* <ReactSmoothScroll> */}
        <div
          className={cn(
            "min-h-screen bg-background font-sans antialiased bg-stone-950 text-stone-50 overflow-hidden",
            fontSans.variable
          )}
        >
          <main className="min-h-screen flex flex-col items-center">{children}</main>
          <Toaster position="top-right" />
        </div>
        {/* </ReactSmoothScroll> */}
      </body>
    </html>
  );
}

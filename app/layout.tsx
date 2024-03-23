import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import Head from "next/head";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

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
  themeColor: "#000000",
  msTileColor: "#000000",
  favicon: "/favicon.ico",
  // add apple touch icon
  appleTouchIcon: "/apple-touch-icon.png",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased dark:bg-stone-950 text-stone-50 overflow-hidden",
          fontSans.variable
        )}
      >
        <main className="min-h-screen flex flex-col items-center">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

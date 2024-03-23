import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
  image: new URL("/images/logo.png", defaultUrl),
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

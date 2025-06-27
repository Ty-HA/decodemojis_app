import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import InstallPWA from "@/components/InstallPWA";
import BottomBar from "@/components/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DecodEmojis - Le dictionnaire d'emojis collaboratif",
  description: "Un dictionnaire évolutif et collaboratif d'emojis pour comprendre leur signification.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DecodEmojis"
  },
  formatDetection: {
    telephone: false,
  }
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="application-name" content="DecodEmojis" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DecodEmojis" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>�️</text></svg>" />
        <link rel="shortcut icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>�️</text></svg>" />
      </head>
      <body className={inter.className + ' !bg-white'}>
        <div className="flex flex-col min-h-screen pb-16 md:pb-0">
          {children}
          <InstallPWA />
          <BottomBar />
        </div>
      </body>
    </html>
  );
}

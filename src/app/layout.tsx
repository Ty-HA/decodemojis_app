import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import InstallPWA from "@/components/InstallPWA";
import BottomBar from "@/components/BottomBar";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://decodemojis.fr";
const SITE_NAME = "DecodEmojis";
const DEFAULT_TITLE = "DecodEmojis — Dictionnaire collaboratif des emojis et de leur signification";
const DEFAULT_DESCRIPTION =
  "Dictionnaire collaboratif francophone pour décoder la signification des emojis et de l'argot des jeunes. Aidez parents, éducateurs et ados à comprendre le langage codé en ligne.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | DecodEmojis",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "emojis",
    "signification emoji",
    "dictionnaire emoji",
    "langage des jeunes",
    "argot ado",
    "cyberharcèlement",
    "décoder emoji",
    "emojis cachés",
    "parents",
    "éducateurs",
  ],
  authors: [{ name: "BTHA System", url: SITE_URL }],
  creator: "BTHA System",
  publisher: "BTHA System",
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "DecodEmojis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/icons/icon-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "fr-FR",
  description: DEFAULT_DESCRIPTION,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BTHA System",
  url: SITE_URL,
  logo: `${SITE_URL}/icons/icon-512x512.png`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className + " bg-white!"}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <div className="flex flex-col min-h-screen pb-16 md:pb-0">
          {children}
          <InstallPWA />
          <BottomBar />
        </div>
      </body>
    </html>
  );
}

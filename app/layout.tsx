import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { Providers, Cursor, ScrollProgress } from "@/components/motion";
import { PhotoViewer } from "@/components/photo-viewer";
import { EnquiryPopup } from "@/components/enquiry-popup";
import { Nav, Footer, Fabs } from "@/components/chrome";
import { JsonLd } from "@/components/ui";
import { site } from "@/lib/content";
import { organizationSchema, websiteSchema } from "@/lib/schema-data";

const instrument = Instrument_Serif({ weight: "400", style: ["italic", "normal"], subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Mini Bus & Tempo Traveller Rental in Bangalore | Shanvi Tours & Travels",
    template: "%s",
  },
  description:
    "Shanvi Tours & Travels Bangalore: 12+1 to 49+1 seater tempo traveller, mini bus & luxury coach rental with verified driver. 5.0★ Google rated, AIS-140 GPS, 100% Yellow Board, 24/7 dispatch.",
  authors: [{ name: "Shanvi Tours & Travels Bangalore" }],
  icons: { icon: "/images/fav.png", apple: "/images/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    images: [{ url: "/images/coach/coach-sunset-side.jpg", width: 1600, height: 1200, alt: "Shanvi Tours & Travels Bangalore Bus Rental Fleet" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  other: { "geo.region": "IN-KA", "geo.placename": "Bangalore, Karnataka, India", "geo.position": "12.9634;77.5099", ICBM: "12.9634, 77.5099" },
};

export const viewport: Viewport = { themeColor: "#fbfaf7", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${instrument.variable} ${manrope.variable}`}>
      <body className="">
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <Providers>
          <ScrollProgress />
          <Cursor />
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
            Skip to content
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <Fabs />
          <PhotoViewer />
          <EnquiryPopup />
        </Providers>
      </body>
    </html>
  );
}

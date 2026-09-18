import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Manrope } from "next/font/google";
import { Header } from "@/components/Header";
import { MotionRoot } from "@/components/MotionRoot";
import { navigation, siteMeta } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  applicationName: siteMeta.identity,
  authors: [{ name: siteMeta.identity }],
  ...(siteUrl
    ? {
        metadataBase: new URL(siteUrl),
        alternates: { canonical: "/" },
      }
    : {}),
  openGraph: {
    title: siteMeta.socialTitle,
    description: siteMeta.socialDescription,
    type: "website",
    locale: "en_US",
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.socialTitle,
    description: siteMeta.socialDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSerif.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full bg-paper font-sans text-text antialiased">
        <MotionRoot>
          <a href="#main" className="skip-link">
            {navigation.skip}
          </a>
          <Header />
          {children}
        </MotionRoot>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-video.css";
import "lightgallery/css/lg-zoom.css";
import "video.js/dist/video-js.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { FontProvider } from "@/components/theme/font-provider";
import { robinDisplay, dmSans } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://prikacouture.com"),
  title: "Prika | Luxury Bridal & Evening Couture",
  description: "We design your dreams. Luxury bridal and evening couture with worldwide shipping. Handcrafted gowns for your special moments.",
  keywords: ["bridal couture", "evening gowns", "luxury fashion", "custom dresses", "wedding dresses", "Nepal"],
  authors: [{ name: "Prika Couture" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Prika | Luxury Bridal & Evening Couture",
    description: "We design your dreams. Luxury bridal and evening couture with worldwide shipping.",
    url: "https://prikacouture.com",
    siteName: "Prika Couture",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/prika-logo.png",
        width: 1080,
        height: 1080,
        alt: "Prika Couture logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prika | Luxury Bridal & Evening Couture",
    description: "We design your dreams. Luxury bridal and evening couture with worldwide shipping.",
    images: ["/prika-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${robinDisplay.variable} ${dmSans.variable}`}>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FontProvider>
            {children}
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

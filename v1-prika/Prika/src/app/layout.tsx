import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { FontProvider } from "@/components/theme/font-provider";
import { eleanore, josefin } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Prika | Luxury Bridal & Evening Couture",
  description: "We design your dreams. Luxury bridal and evening couture with worldwide shipping. Handcrafted gowns for your special moments.",
  keywords: ["bridal couture", "evening gowns", "luxury fashion", "custom dresses", "wedding dresses", "Nepal"],
  authors: [{ name: "Prika Couture" }],
  openGraph: {
    title: "Prika | Luxury Bridal & Evening Couture",
    description: "We design your dreams. Luxury bridal and evening couture with worldwide shipping.",
    url: "https://prikacouture.com",
    siteName: "Prika Couture",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${eleanore.variable} ${josefin.variable}`}>
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

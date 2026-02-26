import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { FontProvider } from "@/components/theme/font-provider";

export const metadata: Metadata = {
  title: "Prika | Luxury Bridal & Evening Couture",
  description: "We design your dreams. Luxury bridal and evening couture with worldwide shipping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
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

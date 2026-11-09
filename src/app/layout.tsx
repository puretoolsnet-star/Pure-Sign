import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/app/providers";
import { siteMetadataBase } from "@/lib/seo/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = siteMetadataBase();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uk"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark min-h-dvh max-w-full overflow-x-hidden antialiased`}
    >
      <body className="flex min-h-dvh max-w-full flex-col overflow-x-hidden antialiased">
        <Providers>{children}</Providers>
        <div
          id="puresign-portal-root"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[100] [&>*]:pointer-events-auto"
        />
      </body>
    </html>
  );
}

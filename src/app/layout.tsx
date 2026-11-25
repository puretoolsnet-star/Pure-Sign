import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

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
        <noscript>
          <iframe
            title="Google Tag Manager"
            src="https://www.googletagmanager.com/ns.html?id=GTM-NLRHWF83"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NLRHWF83');`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FQM5D8R348"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FQM5D8R348');
          `}
        </Script>
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

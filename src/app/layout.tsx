import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";

export const metadata: Metadata = {
  title: "Master Premier Green Energy Co. Ltd",
  description: "Engineering and clean energy advisory services in South Sudan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <SessionProvider>
          <AnalyticsProvider />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

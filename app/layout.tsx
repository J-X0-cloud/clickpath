import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/data/site";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Clickpath | Link and conversion attribution for paid traffic",
    template: "%s | Clickpath",
  },
  description:
    "Branded short links, UTM builder, click to lead to sale attribution and a server-side conversion API for Meta, Google Ads and TikTok.",
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
  openGraph: { siteName: "Clickpath", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#0B231C",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

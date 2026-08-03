import type { Metadata } from "next";
import { siteFontClassName } from "../site-fonts";
import {
  getLanguageAlternates,
  siteIcons,
} from "../site-metadata";
import { SITE_ORIGIN } from "../site-config";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = new URL("/og-v2.png", SITE_ORIGIN);

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: "Sigma Code — Durable, verifiable coding agent",
    description:
      "An open-source coding agent with durable sessions, native sandboxing, and evidence-backed completion.",
    alternates: {
      canonical: new URL("/en", SITE_ORIGIN),
      languages: getLanguageAlternates(),
    },
    icons: siteIcons,
    openGraph: {
      type: "website",
      url: new URL("/en", SITE_ORIGIN),
      locale: "en_US",
      title: "Sigma Code — Work survives. Proof closes the task.",
      description:
        "Durable sessions, native sandboxes, and evidence-backed completion.",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Sigma Code — Work survives. Proof closes the task.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sigma Code — Work survives. Proof closes the task.",
      description:
        "Durable sessions, native sandboxes, and evidence-backed completion.",
      images: [ogImage],
    },
  };
}

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={siteFontClassName}>{children}</body>
    </html>
  );
}

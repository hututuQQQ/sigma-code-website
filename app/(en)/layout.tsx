import type { Metadata } from "next";
import { siteFontClassName } from "../site-fonts";
import {
  getLanguageAlternates,
  getRequestOrigin,
  siteIcons,
} from "../site-metadata";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const origin = await getRequestOrigin();
  const ogImage = new URL("/og-v2.png", origin);

  return {
    title: "Sigma Code — Durable, verifiable coding agent",
    description:
      "An open-source coding agent with durable sessions, native sandboxing, and evidence-backed completion.",
    alternates: {
      canonical: new URL("/en", origin),
      languages: getLanguageAlternates(origin),
    },
    icons: siteIcons,
    openGraph: {
      type: "website",
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

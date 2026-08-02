import type { Metadata } from "next";
import { headers } from "next/headers";
import { LandingPage } from "../landing-page";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host ?? "localhost:3000"}`;

  return {
    title: "Sigma Code — Durable, verifiable coding agent",
    description:
      "An open-source coding agent with durable sessions, native sandboxing, and evidence-backed completion.",
    alternates: {
      canonical: `${origin}/en`,
      languages: { "zh-CN": origin, en: `${origin}/en` },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      title: "Sigma Code — Work survives. Proof closes the task.",
      description:
        "Durable sessions, native sandboxes, and evidence-backed completion.",
      images: [
        {
          url: new URL("/og-v2.png", origin),
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
      images: [new URL("/og-v2.png", origin)],
    },
  };
}

export default function EnglishHome() {
  return <LandingPage locale="en" />;
}

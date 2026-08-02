import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host ?? "localhost:3000"}`;
  const ogImage = new URL("/og-v2.png", origin);

  return {
    title: "Sigma Code — 可恢复、可验证的开源 Coding Agent",
    description:
      "Sigma Code 为长任务而生：耐久会话、原生沙箱，以及由测试与审查证据约束的完成协议。",
    keywords: [
      "Sigma Code",
      "Coding Agent",
      "开源 Coding Agent",
      "可恢复 AI Agent",
      "AI Agent 沙箱",
      "DeepSeek Coding Agent",
    ],
    alternates: {
      canonical: new URL("/", origin),
      languages: {
        "zh-CN": new URL("/", origin),
        en: new URL("/en", origin),
      },
    },
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon.ico" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      title: "Sigma Code — 让任务越过中断，带着证据完成",
      description:
        "耐久会话、原生沙箱，以及由测试与审查证据约束的开源 Coding Agent。",
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
        "An open-source coding agent with durable sessions, native sandboxing, and evidence-backed completion.",
      images: [ogImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}

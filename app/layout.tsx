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
  const ogImage = new URL("/og.png", `${protocol}://${host ?? "localhost:3000"}`);

  return {
    title: "Sigma Code — 不会因中断丢进度的开源 Coding Agent",
    description:
      "Sigma Code 在原生沙箱中执行长任务，从中断处继续，并在验证通过后才宣告完成。",
    keywords: [
      "Sigma Code",
      "Coding Agent",
      "开源 Coding Agent",
      "可恢复 AI Agent",
      "AI Agent 沙箱",
      "DeepSeek Coding Agent",
    ],
    icons: {
      icon: "/sigma-code-mark.png",
      shortcut: "/sigma-code-mark.png",
    },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      title: "Sigma Code — Survives interruptions. Proves its changes.",
      description:
        "不会因中断丢进度、不会在没有验证时宣称完成的开源 Coding Agent。",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Sigma Code — Resume. Verify. Ship.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sigma Code — Survives interruptions. Proves its changes.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

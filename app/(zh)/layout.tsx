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
      canonical: new URL("/", SITE_ORIGIN),
      languages: getLanguageAlternates(),
    },
    icons: siteIcons,
    openGraph: {
      type: "website",
      url: new URL("/", SITE_ORIGIN),
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

export default function ChineseRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={siteFontClassName}>{children}</body>
    </html>
  );
}

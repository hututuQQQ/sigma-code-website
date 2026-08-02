import type { Metadata } from "next";
import { headers } from "next/headers";

export async function getRequestOrigin() {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");

  return `${protocol}://${host ?? "localhost:3000"}`;
}

export function getLanguageAlternates(origin: string) {
  return {
    "zh-CN": new URL("/", origin),
    en: new URL("/en", origin),
    "x-default": new URL("/", origin),
  };
}

export const siteIcons = {
  icon: [
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/favicon.ico" },
  ],
  shortcut: "/favicon.ico",
  apple: "/apple-touch-icon.png",
} satisfies Metadata["icons"];

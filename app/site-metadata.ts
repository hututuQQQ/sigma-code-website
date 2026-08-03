import type { Metadata } from "next";
import { SITE_ORIGIN } from "./site-config";

export function getLanguageAlternates() {
  return {
    "zh-CN": new URL("/", SITE_ORIGIN),
    en: new URL("/en", SITE_ORIGIN),
    "x-default": new URL("/", SITE_ORIGIN),
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

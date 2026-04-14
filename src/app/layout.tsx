import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GAMERS - פורטל משחקים ותוכן",
  description: "פורטל המשחקים המוביל בישראל - חדשות, ביקורות, קהילה",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acesso Exclusivo",
  description: "Links VIP",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
    >
      <body className="min-h-[100dvh] flex flex-col bg-zinc-950 text-zinc-100 overflow-x-hidden relative">
        <div className="fixed inset-0 z-50 pointer-events-none bg-noise opacity-20 mix-blend-overlay"></div>
        {children}
      </body>
    </html>
  );
}

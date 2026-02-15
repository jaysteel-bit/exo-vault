import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exo Vault | Resource Hub",
  description: "Access exclusive resources, frameworks, and insights from Exo Enterprise. Unlock the value ladder to scale your business.",
  keywords: ["Exo Enterprise", "Operations", "AI", "Scaling", "Business Systems", "Resources"],
  authors: [{ name: "Exo Enterprise" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Exo Vault | Resource Hub",
    description: "Your resource library for building self-running enterprises. Download frameworks, templates, and tools.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exo Vault | Resource Hub",
    description: "Your resource library for building self-running enterprises.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* Iconify */}
        <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" async></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
        <Toaster />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Syed Salman Ali | Cloud Team Lead",
  description: "Cloud Team Lead at AKSIQ, architecting multi-region AWS infrastructure for a license-based enterprise platform serving 22+ clients.",
  keywords: ["cloud engineer", "AWS", "DevOps", "backend", "infrastructure", "Syed Salman Ali"],
  authors: [{ name: "Syed Salman Ali" }],
  openGraph: {
    type: "website",
    title: "Syed Salman Ali | Cloud Team Lead",
    description: "Cloud Team Lead at AKSIQ, architecting multi-region AWS infrastructure serving 22+ clients.",
    url: "https://syedsalmanali.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

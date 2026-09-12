import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const SITE = "https://syedsalmanali.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Syed Salman Ali | Cloud Team Lead",
    template: "%s | Syed Salman Ali",
  },
  description:
    "Cloud Team Lead at AKSiQ, architecting multi-region AWS infrastructure for a license-based enterprise platform serving 22+ clients.",
  keywords: ["cloud engineer", "AWS", "DevOps", "backend", "infrastructure", "Syed Salman Ali"],
  authors: [{ name: "Syed Salman Ali", url: SITE }],
  creator: "Syed Salman Ali",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Syed Salman Ali",
    title: "Syed Salman Ali | Cloud Team Lead",
    description:
      "Cloud Team Lead at AKSiQ, architecting multi-region AWS infrastructure serving 22+ clients.",
    url: SITE,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Syed Salman Ali — Cloud Team Lead" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Salman Ali | Cloud Team Lead",
    description:
      "Cloud Team Lead at AKSiQ, architecting multi-region AWS infrastructure serving 22+ clients.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060a11" },
    { media: "(prefers-color-scheme: light)", color: "#f8f9fb" },
  ],
};

// Runs before first paint so the saved theme's background is already there:
// no dark flash for visitors who chose the light theme.
const BOOT_THEME = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}var d=document.documentElement;d.dataset.theme=t;d.style.background=t==='dark'?'#060a11':'#f8f9fb';d.style.colorScheme=t;}catch(e){}})();`;

const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Syed Salman Ali",
  jobTitle: "Cloud Team Lead",
  worksFor: { "@type": "Organization", name: "AKS iQ" },
  url: SITE,
  email: "mailto:i.syedsalmanali@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  sameAs: [
    "https://github.com/iSyedSalmanAli",
    "https://www.linkedin.com/in/isyedsalmanali",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_THEME }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSONLD) }}
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

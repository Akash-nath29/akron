import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: {
    default: "Akron ORM - Universal Python ORM",
    template: "%s | Akron ORM"
  },
  description: "Universal, framework-independent ORM for Python. Simple, lightweight, and developer-friendly. Supports SQLite, MySQL, PostgreSQL, and MongoDB with type safety and automatic migrations.",
  keywords: [
    "Python ORM",
    "SQLite ORM", 
    "MySQL ORM",
    "PostgreSQL ORM", 
    "MongoDB ORM",
    "Universal ORM",
    "Type-safe ORM",
    "Python database",
    "Database abstraction",
    "Pydantic ORM",
    "Auto migrations",
    "Cross-database ORM",
    "Framework independent",
    "Python SQL",
    "NoSQL Python"
  ],
  authors: [{ name: "Akash Nath", url: "https://github.com/Akash-nath29" }],
  creator: "Akash Nath",
  publisher: "Akron ORM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tryakron.tech/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tryakron.tech/",
    title: "Akron ORM - Universal Python ORM",
    description: "Universal, framework-independent ORM for Python. Simple, lightweight, and developer-friendly. Supports SQLite, MySQL, PostgreSQL, and MongoDB with type safety and automatic migrations.",
    siteName: "Akron ORM",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Akron ORM - Universal Python ORM Logo",
        type: "image/png",
      },
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Akron ORM Logo",
        type: "image/png",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akron ORM - Universal Python ORM",
    description: "Universal, framework-independent ORM for Python. Supports SQLite, MySQL, PostgreSQL, and MongoDB with type safety.",
    images: ["/logo.png"],
    creator: "@akashnath29",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/logo.png",
    },
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Akron ORM",
    "description": "Universal, framework-independent ORM for Python. Supports SQLite, MySQL, PostgreSQL, and MongoDB with type safety and automatic migrations.",
    "url": "https://tryakron.tech/",
    "author": {
      "@type": "Person",
      "name": "Akash Nath",
      "url": "https://github.com/Akash-nath29"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "Akron ORM",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tryakron.tech//logo.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://tryakron.tech//docs?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://github.com/Akash-nath29/akron",
      "https://pypi.org/project/akron/"
    ]
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Akron ORM",
    "description": "Universal, framework-independent ORM for Python. Supports SQLite, MySQL, PostgreSQL, and MongoDB with type safety and automatic migrations.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Cross-platform",
    "programmingLanguage": "Python",
    "author": {
      "@type": "Person",
      "name": "Akash Nath",
      "url": "https://github.com/Akash-nath29"
    },
    "downloadUrl": "https://pypi.org/project/akron/",
    "license": "https://github.com/Akash-nath29/akron/blob/main/LICENSE",
    "codeRepository": "https://github.com/Akash-nath29/akron",
    "softwareVersion": "latest",
    "requirements": "Python 3.7+",
    "keywords": "Python, ORM, SQLite, MySQL, PostgreSQL, MongoDB, Database, Type-safe",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#f97316" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <Script
          id="structured-data-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <Script
          id="structured-data-software"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

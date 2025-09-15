import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Akron ORM - Universal Python ORM for Modern Applications",
  description: "Build database applications with confidence using Akron ORM. Universal Python ORM supporting SQLite, MySQL, PostgreSQL, and MongoDB with type safety, automatic migrations, and zero dependencies.",
  keywords: [
    "Python ORM",
    "Universal ORM", 
    "SQLite Python",
    "MySQL Python",
    "PostgreSQL Python",
    "MongoDB Python",
    "Type-safe ORM",
    "Auto migrations",
    "Cross-database ORM",
    "Framework independent ORM",
    "Python database abstraction",
    "Pydantic ORM",
    "Modern Python ORM",
    "Database agnostic ORM",
    "Multi-database Python"
  ],
  openGraph: {
    title: "Akron ORM - Universal Python ORM for Modern Applications",
    description: "Build database applications with confidence using Akron ORM. Universal Python ORM supporting SQLite, MySQL, PostgreSQL, and MongoDB with type safety and automatic migrations.",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Akron ORM - Universal Python ORM Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akron ORM - Universal Python ORM",
    description: "Build database applications with confidence. Universal Python ORM supporting SQLite, MySQL, PostgreSQL, and MongoDB.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://tryakron.tech/",
  },
};
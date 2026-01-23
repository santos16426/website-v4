import { Metadata } from "next";
import { siteConfig } from "./site";

export const formatDate = (date: string) => {
  const newDate = new Date(date);

  const month = newDate.toLocaleString("en-US", { month: "2-digit" }); // Full month name
  const year = newDate.getFullYear();

  return { month, year };
};

// Export event tracking functions
export * from "./events";

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
  canonical,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  canonical?: string;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: [
      "Billy",
      "Software Engineer",
      "Full Stack Developer",
      "React Developer",
      "Node.js Developer",
      "Next.js Developer",
      "TypeScript Developer",
      "Software Engineer",
      "Web Developer",
      "Portfolio",
      "Projects",
      "Skills",
      "Frontend Developer",
      "Backend Developer",
      "Philippines Developer",
      "Quezon City Developer",
      "Billy Joe Santos Portfolio",
      "Billy Joe Santos Projects",
      "Billy Joe Santos Skills",
      "Billy Joe Santos Frontend Developer",
      "Billy Joe Santos Backend Developer",
      "Billy Joe Santos Philippines Developer",
      "Billy Joe Santos Quezon City Developer",
      "Billy Joe Santos",
      "Billy Joe Santos Software Engineer",
      "Billy Joe Santos Developer",
      "Lucas Software Engineer",
      "Full Stack Developer",
      "React Developer",
      "Node.js Developer",
      "Next.js Developer",
      "TypeScript Developer",
      "Software Engineer",
      "Web Developer",
      "Portfolio",
      "Projects",
      "Skills",
      "Frontend Developer",
      "Backend Developer",
      "Philippines Developer",
      "Quezon City Developer",
    ],
    authors: [
      {
        name: "Billy Joe Santos",
        url: siteConfig.url,
      },
    ],
    creator: "Billy Joe Santos",
    publisher: "Billy Joe Santos",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonical || siteConfig.url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical || siteConfig.url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@lucas.gif",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: icons,
      shortcut: icons,
      apple: icons,
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
    verification: {
      // Add your verification codes here when available
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
      // yahoo: "your-yahoo-verification-code",
    },
  };
}

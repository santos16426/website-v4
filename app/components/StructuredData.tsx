import { siteConfig } from "../utils/site";

interface StructuredDataProps {
  about: {
    name: string;
    title: string;
    description: string;
    contactEmail: string;
    address?: string;
  };
  socialHandles?: Array<{
    platform: string;
    url: string;
    _id: string;
  }>;
}

export default function StructuredData({ about, socialHandles }: StructuredDataProps) {
  // Extract social media URLs
  const socialUrls = socialHandles?.map((handle) => handle.url) || [
    siteConfig.links.github,
    siteConfig.links.facebook,
  ];

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: about.name,
      email: about.contactEmail,
      jobTitle: about.title,
      ...(about.address && {
        address: {
          "@type": "PostalAddress",
          addressLocality: about.address,
        },
      }),
    },
  };

  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: about.name,
    jobTitle: about.title,
    description: about.description,
    email: about.contactEmail,
    url: siteConfig.url,
    ...(about.address && {
      address: {
        "@type": "PostalAddress",
        addressLocality: about.address,
      },
    }),
    sameAs: socialUrls,
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon.ico`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
    </>
  );
}

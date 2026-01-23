import { siteConfig } from "../utils/site";
import { Blog } from "../utils/interface";

interface BlogStructuredDataProps {
  blog: Blog;
  authorName: string;
  authorEmail: string;
}

export default function BlogStructuredData({ blog, authorName, authorEmail }: BlogStructuredDataProps) {
  const blogUrl = `${siteConfig.url}/blog/${blog.alias}`;
  const publishedDate = blog.date ? new Date(blog.date).toISOString() : new Date().toISOString();

  // Article structured data
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.shortDescription || blog.title,
    image: blog.thumbnail ? [blog.thumbnail] : [siteConfig.ogImage],
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      "@type": "Person",
      name: authorName,
      email: authorEmail,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogUrl,
    },
    url: blogUrl,
    ...(blog.tags && blog.tags.length > 0 && {
      keywords: blog.tags.join(", "),
    }),
  };

  // BreadcrumbList structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteConfig.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: blogUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
    </>
  );
}

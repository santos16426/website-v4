import { MetadataRoute } from "next";
import { siteConfig } from "./utils/site";
import { Portfolio } from "./utils/interface";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const portfolio = (await import("./siteConfig.json")).default as Portfolio;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/project`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#skills`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#experience`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Add blog pages
  const blogPages: MetadataRoute.Sitemap = (portfolio.blogs || []).map((blog) => ({
    url: `${baseUrl}/blog/${blog.alias}`,
    lastModified: blog.date ? new Date(blog.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Add project pages
  const projectPages: MetadataRoute.Sitemap = (portfolio.projects || []).map((project) => ({
    url: `${baseUrl}/project/${project.alias}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages, ...projectPages];
}

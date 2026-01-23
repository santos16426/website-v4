import { notFound } from "next/navigation";
import Header from "../../components/header";
import { Portfolio, Blog } from "../../utils/interface";
import BlogContent from "../../components/ui/BlogContent";
import BlogStructuredData from "../../components/BlogStructuredData";
import { constructMetadata } from "../../utils";
import { siteConfig } from "../../utils/site";

interface BlogDetailPageProps {
  params: Promise<{ alias: string }>;
}

async function getBlog(alias: string): Promise<Blog | null> {
  const portfolio = (await import("../../siteConfig.json")).default;
  const { blogs } = portfolio as Portfolio;
  if (!blogs) return null;
  return blogs.find((b) => b.alias === alias) || null;
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { alias } = await params;
  const blog = await getBlog(alias);

  if (!blog) {
    return constructMetadata();
  }

  const blogUrl = `${siteConfig.url}/blog/${blog.alias}`;

  return constructMetadata({
    title: blog.title,
    description: blog.shortDescription || blog.title,
    image: blog.thumbnail || siteConfig.ogImage,
    canonical: blogUrl,
  });
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { alias } = await params;
  const blog = await getBlog(alias);

  if (!blog) {
    notFound();
  }

  const portfolio = (await import("../../siteConfig.json")).default;
  const { social_handles, about } = portfolio as Portfolio;

  return (
    <>
      <BlogStructuredData 
        blog={blog} 
        authorName={about.name}
        authorEmail={about.contactEmail}
      />
      <Header social={social_handles} />
      <BlogContent blog={blog} />
    </>
  );
}

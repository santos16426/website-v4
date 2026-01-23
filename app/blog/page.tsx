import Blogs from "../components/Blogs";
import Header from "../components/header";
import { Portfolio } from "../utils/interface";
import { constructMetadata } from "../utils";
import { siteConfig } from "../utils/site";

export const metadata = constructMetadata({
  title: "Blog Articles",
  description: "Explore articles about web development, React, TypeScript, and software engineering best practices.",
  canonical: `${siteConfig.url}/blog`,
});

export default async function BlogListPage() {
  const portfolio = (await import("../siteConfig.json")).default;
  const { blogs, social_handles } = portfolio as Portfolio;

  if (!blogs || blogs.length === 0) {
    return (
      <main className="relative">
        <Header social={social_handles} />
        <div className="px-2 py-20 text-center">
          <p className="text-foreground/70">No blog posts available yet.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative">
      <Header social={social_handles} />
      <Blogs blogs={blogs} showAll={true} />
    </main>
  );
}

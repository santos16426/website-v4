"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ExternalLink, Youtube, Code2, BookOpen, Link2, Check, Copy } from "lucide-react";
import { Blog } from "../../utils/interface";
import { SlideIn, Transition } from "./Transitions";
import { SectionHeading } from "./Typography";
import { BlogNav } from "./BlogNav";
import { CodeBlock } from "./CodeBlock";
import { trackSocialShare, trackEvent, trackLinkClick } from "../../utils/events";

interface BlogContentProps {
  blog: Blog;
}

export default function BlogContent({ blog }: BlogContentProps) {
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get current page URL
  const getArticleUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    // Fallback: construct URL from blog alias
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    return baseUrl ? `${baseUrl}/blog/${blog.alias}` : '';
  };

  // Copy article URL to clipboard
  const copyToClipboard = async () => {
    try {
      const url = getArticleUrl();
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackEvent({
        category: "engagement",
        action: "copy_link",
        label: blog.title,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  // Social sharing URLs - always gets fresh URL at call time
  const getShareUrl = (platform: string) => {
    // Always get fresh URL from window.location (client-side only)
    let currentUrl = '';
    if (typeof window !== 'undefined') {
      currentUrl = window.location.href;
    }

    // Fallback: construct URL from blog alias if window is not available
    if (!currentUrl) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
      currentUrl = baseUrl ? `${baseUrl}/blog/${blog.alias}` : '';
    }

    if (!currentUrl) {
      return '#';
    }

    const url = encodeURIComponent(currentUrl);
    const title = encodeURIComponent(blog.title || '');
    const text = encodeURIComponent(blog.shortDescription || '');

    switch (platform) {
      case 'twitter':
        // Twitter/X uses twitter.com/intent/tweet
        // Combine title and description for better sharing (limit to 200 chars to leave room for URL)
        const tweetText = text ? `${title} - ${text}` : title;
        const encodedTweet = encodeURIComponent(tweetText.substring(0, 200));
        return `https://twitter.com/intent/tweet?text=${encodedTweet}&url=${url}`;
      case 'facebook':
        // Facebook share URL format
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      case 'linkedin':
        // LinkedIn share URL format
        return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      default:
        return '#';
    }
  };

  // Extract headings from HTML content and generate IDs
  const extractHeadings = (html: string): Array<{ id: string; label: string; level: number }> => {
    const headings: Array<{ id: string; label: string; level: number }> = [];
    const headingRegex = /<h([1-4])[^>]*>(.*?)<\/h[1-4]>/gi;
    let match;
    const usedIds = new Set<string>();

    while ((match = headingRegex.exec(html)) !== null) {
      const level = parseInt(match[1]);
      const text = match[2].replace(/<[^>]*>/g, '').trim(); // Remove HTML tags from heading text
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Make ID unique if it's already used
      let uniqueId = id;
      let counter = 1;
      while (usedIds.has(uniqueId)) {
        uniqueId = `${id}-${counter}`;
        counter++;
      }
      usedIds.add(uniqueId);

      if (uniqueId) {
        headings.push({ id: uniqueId, label: text, level });
      }
    }

    return headings;
  };

  // Process content to add IDs to headings
  const processContent = (html: string): string => {
    if (!html) return '';

    const usedIds = new Set<string>();

    return html.replace(/<h([1-4])([^>]*)>(.*?)<\/h[1-4]>/gi, (match, level, attrs, text) => {
      const textContent = text.replace(/<[^>]*>/g, '').trim();
      const id = textContent
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Check if id already exists in attributes
      if (attrs && attrs.includes('id=')) {
        return match; // Already has an ID
      }

      // Make ID unique if it's already used
      let uniqueId = id;
      let counter = 1;
      while (usedIds.has(uniqueId)) {
        uniqueId = `${id}-${counter}`;
        counter++;
      }
      usedIds.add(uniqueId);

      return `<h${level}${attrs} id="${uniqueId}">${text}</h${level}>`;
    });
  };

  // Build navigation items
  const navItems = [];
  navItems.push({ id: "overview", label: "Overview" });

  // Extract and add headings from content
  if (blog.content) {
    const headings = extractHeadings(blog.content);
    headings.forEach(heading => {
      navItems.push({
        id: heading.id,
        label: heading.label,
        level: heading.level
      });
    });
  }

  if (blog.codeSamples && blog.codeSamples.length > 0) {
    navItems.push({ id: "code-samples", label: "Code Examples" });
  }
  if (blog.youtubeUrl) {
    navItems.push({ id: "video", label: "Video Tutorial" });
  }
  if (blog.resources && blog.resources.length > 0) {
    navItems.push({ id: "resources", label: "Resources" });
  }
  if (blog.relatedLinks && blog.relatedLinks.length > 0) {
    navItems.push({ id: "related", label: "Related Reading" });
  }

  const processedContent = processContent(blog.content || '');

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = blog.youtubeUrl ? getYouTubeVideoId(blog.youtubeUrl) : null;

  return (
    <main className="relative min-h-screen">
      <BlogNav items={navItems} />
      <div className="px-2 py-20 relative max-w-6xl mx-auto">
        <span className="blob absolute top-[20%] right-0 w-1/3 h-5/6 blur-[100px] rotate-180 -z-10 opacity-50" />

        <Transition className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black rounded"
            aria-label="Back to blog articles list"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span>Back to Articles</span>
          </Link>
        </Transition>

        <div className="mb-12">
          <SectionHeading>
            <SlideIn>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-950/55 text-emerald-300 text-sm capitalize">
                  {blog.type}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {blog.title}
              </h1>
            </SlideIn>
            <Transition>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4 text-foreground/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" aria-hidden="true" />
                    <time dateTime={blog.date} className="text-sm">{formatDate(blog.date)}</time>
                  </div>
                  {blog.readTime && (
                    <>
                      <span className="text-sm">�</span>
                      <div className="flex items-center gap-2">
                        <Clock className="size-4" aria-hidden="true" />
                        <span className="text-sm">{blog.readTime}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Share and Bookmark Buttons */}
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={copyToClipboard}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-foreground/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-emerald-400/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
                    aria-label={copied ? "Link copied to clipboard" : "Copy article link to clipboard"}
                  >
                    {copied ? (
                      <>
                        <Check className="size-4 text-emerald-400" />
                        <span className="hidden sm:inline text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-4" />
                        <span className="hidden sm:inline">Copy Link</span>
                      </>
                    )}
                  </motion.button>

                  {/* Social Share Buttons */}
                  <div className="hidden md:flex items-center gap-1 ml-2 pl-2 border-l border-white/10">
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault();
                      const url = getShareUrl('twitter');
                      if (url && url !== '#') {
                        trackSocialShare('Twitter', blog.title);
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-foreground/50 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black rounded"
                      aria-label="Share on Twitter"
                    >
                      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </motion.button>
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        const url = getShareUrl('facebook');
                        if (url && url !== '#') {
                          trackSocialShare('Facebook', blog.title);
                          window.open(url, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-foreground/50 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black rounded"
                      aria-label="Share on Facebook"
                    >
                      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </motion.button>
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        const url = getShareUrl('linkedin');
                        if (url && url !== '#') {
                          trackSocialShare('LinkedIn', blog.title);
                          window.open(url, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-foreground/50 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-black rounded"
                      aria-label="Share on LinkedIn"
                    >
                      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
            </Transition>
          </SectionHeading>
        </div>

        {/* Thumbnail Image */}
        {blog.thumbnail && (
          <Transition className="mb-12">
            <div className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden border border-white/10">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Transition>
        )}

        <div className="max-w-4xl mx-auto">
          {/* Overview Section */}
          <div id="overview" className="mb-12">
            <Transition>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                Overview
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p className="text-lg">
                  {blog.shortDescription}
                </p>
              </div>
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-foreground/70 bg-white/10 rounded-full px-4 py-2 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Transition>
          </div>

          {/* Content Section */}
          {blog.content && (
            <div className="mb-12">
              <Transition>
                <article className="max-w-none prose prose-invert prose-lg">
                  <div
                    className="[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:leading-tight [&_h1]:scroll-mt-24
                      [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-5 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-white/10 [&_h2]:leading-snug [&_h2]:scroll-mt-24
                      [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:leading-snug [&_h3]:scroll-mt-24
                      [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-white [&_h4]:mt-6 [&_h4]:mb-3 [&_h4]:leading-snug [&_h4]:scroll-mt-24
                      [&_p]:text-lg [&_p]:text-foreground/80 [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:text-justify
                      [&_strong]:text-white [&_strong]:font-semibold
                      [&_a]:text-emerald-400 [&_a]:no-underline [&_a]:transition-colors hover:[&_a]:text-emerald-300 hover:[&_a]:underline [&_a]:font-medium
                      [&_ul]:my-6 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:marker:text-emerald-400
                      [&_ol]:my-6 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:marker:text-emerald-400
                      [&_li]:text-foreground/80 [&_li]:leading-relaxed [&_li]:pl-2
                      [&_code]:text-emerald-400 [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:before:content-[''] [&_code]:after:content-['']
                      [&_pre]:bg-black/40 [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-6
                      [&_pre_code]:text-foreground/90 [&_pre_code]:bg-transparent [&_pre_code]:p-0
                      [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-400/50 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-foreground/70 [&_blockquote]:my-6 [&_blockquote]:bg-white/5 [&_blockquote]:py-4 [&_blockquote]:rounded-r-lg
                      [&_img]:rounded-lg [&_img]:border [&_img]:border-white/10 [&_img]:my-8 [&_img]:max-w-full [&_img]:h-auto [&_img]:shadow-xl
                      [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-white/10 [&_hr]:my-10
                      [&_table]:w-full [&_table]:border-collapse [&_table]:my-8 [&_table]:rounded-lg [&_table]:overflow-hidden
                      [&_th]:border [&_th]:border-white/10 [&_th]:p-4 [&_th]:bg-white/5 [&_th]:font-semibold [&_th]:text-white [&_th]:text-left
                      [&_td]:border [&_td]:border-white/10 [&_td]:p-4 [&_td]:text-foreground/80"
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                  />
                </article>
              </Transition>
            </div>
          )}

          {/* Code Samples Section */}
          {blog.codeSamples && blog.codeSamples.length > 0 && (
            <div id="code-samples" className="mb-12">
              <Transition>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Code2 className="size-6" />
                  Code Samples
                </h2>
                <div className="space-y-8">
                  {blog.codeSamples.map((sample, index) => (
                    <div key={index}>
                      {sample.title && (
                        <h3 className="text-lg font-semibold text-white mb-3">
                          {sample.title}
                        </h3>
                      )}
                      {sample.description && (
                        <p className="text-sm text-foreground/70 mb-4">
                          {sample.description}
                        </p>
                      )}
                      <CodeBlock
                        code={sample.code}
                        language={sample.language || "javascript"}
                      />
                    </div>
                  ))}
                </div>
              </Transition>
            </div>
          )}

          {/* YouTube Video Section */}
          {blog.youtubeUrl && videoId && (
            <div id="video" className="mb-12">
              <Transition>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Youtube className="size-6" />
                  Video Tutorial
                </h2>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-black/20">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${blog.title} - YouTube Video`}
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4">
                  <a
                    href={blog.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
                  >
                    <ExternalLink className="size-4" />
                    <span>Watch on YouTube</span>
                  </a>
                </div>
              </Transition>
            </div>
          )}


          {/* Resources Section */}
          {blog.resources && blog.resources.length > 0 && (
            <div id="resources" className="mb-12">
              <Transition>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="size-6" />
                  Resources
                </h2>
                <div className="space-y-3">
                  {blog.resources.map((resource, index) => (
                    <motion.a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="group flex items-start gap-4 py-3 px-1 hover:px-2 transition-all duration-300"
                    >
                      <BookOpen className="size-4 text-foreground/40 group-hover:text-emerald-400 transition-colors shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-white mb-1 group-hover:text-emerald-400 transition-colors duration-300">
                          {resource.title}
                        </h3>
                        {resource.description && (
                          <p className="text-sm text-foreground/60 leading-relaxed">
                            {resource.description}
                          </p>
                        )}
                      </div>
                      <ExternalLink className="size-4 text-foreground/30 group-hover:text-emerald-400 transition-colors shrink-0 mt-1" />
                    </motion.a>
                  ))}
                </div>
              </Transition>
            </div>
          )}

          {/* Related Links Section */}
          {blog.relatedLinks && blog.relatedLinks.length > 0 && (
            <div id="related" className="mb-12">
              <Transition>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Link2 className="size-6" />
                  Related Reading
                </h2>
                <div className="space-y-3">
                  {blog.relatedLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="group flex items-start gap-4 py-3 px-1 hover:px-2 transition-all duration-300"
                    >
                      <Link2 className="size-4 text-foreground/40 group-hover:text-blue-400 transition-colors shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-medium text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
                          {link.title}
                        </h3>
                        {link.description && (
                          <p className="text-sm text-foreground/60 leading-relaxed">
                            {link.description}
                          </p>
                        )}
                      </div>
                      <ExternalLink className="size-4 text-foreground/30 group-hover:text-blue-400 transition-colors shrink-0 mt-1" />
                    </motion.a>
                  ))}
                </div>
              </Transition>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

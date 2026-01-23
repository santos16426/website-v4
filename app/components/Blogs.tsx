"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogsProps } from "../utils/types";
import { SlideIn, Transition } from "./ui/Transitions";
import { SectionHeading } from "./ui/Typography";
import { BookOpen, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import { trackLinkClick, trackBlogView } from "../utils/events";

const MotionLink = motion.create(Link);

function Blogs({ blogs, showAll = false }: BlogsProps & { showAll?: boolean }) {
  const displayedBlogs = showAll ? blogs : blogs.filter((blog) => blog.featured).slice(0, 3);
  const containerRef = useRef<HTMLDivElement>(null);

  if (blogs.length === 0) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    },
  };

  const imageVariants = {
    rest: { scale: 1, filter: "brightness(1)" },
    hover: { 
      scale: 1.1,
      filter: "brightness(1.1)",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const contentVariants = {
    rest: { y: 0 },
    hover: { 
      y: -4,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <section className="px-2 py-20 relative" id="blog">
      <span className="blob absolute top-[20%] right-0 w-1/3 h-5/6 blur-[100px] rotate-180 -z-10 opacity-50" />
      <SectionHeading className="">
        <SlideIn className="text-white/40">
          <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-950/55 px-4 py-2 text-emerald-300">
            <BookOpen className="size-4" aria-hidden="true" />
            <h2 className="text-sm font-medium tracking-wide max-sm:text-xs">Latest Articles</h2>
          </div>
        </SlideIn>
      </SectionHeading>
      <div className="mx-auto mt-12 max-w-7xl">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayedBlogs.map((blog) => (
            <motion.div
              key={blog._id || blog.alias}
              variants={cardVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <MotionLink
                href={`/blog/${blog.alias}`}
                className="group block bg-white/5 rounded-lg overflow-hidden transition-all duration-300 relative"
              >
                <motion.div 
                  className="relative w-full h-56 overflow-hidden"
                  variants={imageVariants}
                >
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
                <motion.div 
                  className="p-6"
                  variants={contentVariants}
                >
                  <motion.div 
                    className="flex items-center gap-3 mb-3 text-xs text-foreground/60"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.span 
                      className="capitalize font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      {blog.type}
                    </motion.span>
                    <span aria-hidden="true">•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="size-3" aria-hidden="true" />
                      <time dateTime={blog.date}>{formatDate(blog.date)}</time>
                    </div>
                  </motion.div>
                  <motion.h3 
                    className="text-lg font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2"
                    whileHover={{ x: 4 }}
                  >
                    {blog.title}
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-foreground/70 mb-4 line-clamp-3 leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {blog.shortDescription}
                  </motion.p>
                  <motion.div 
                    className="flex items-center justify-between pt-4 border-t border-white/10"
                    initial={{ borderColor: "rgba(255,255,255,0.1)" }}
                    whileHover={{ borderColor: "rgba(16, 185, 129, 0.3)" }}
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {blog.tags?.slice(0, 2).map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          className="text-xs text-foreground/60 bg-white/5 rounded px-2 py-1"
                          initial={{ opacity: 0.6, scale: 0.9 }}
                          whileHover={{ 
                            opacity: 1, 
                            scale: 1.05,
                            backgroundColor: "rgba(16, 185, 129, 0.1)",
                          }}
                          transition={{ delay: tagIndex * 0.05 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <motion.span 
                      className="text-xs text-foreground/50"
                      whileHover={{ scale: 1.1 }}
                    >
                      {blog.readTime || "5 min read"}
                    </motion.span>
                  </motion.div>
                </motion.div>
              </MotionLink>
            </motion.div>
          ))}
        </motion.div>
        {!showAll && (
          <Transition className="flex items-center justify-center mt-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-foreground/70 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
                onClick={() => trackLinkClick("/blog", "View All Articles")}
                aria-label="View all blog articles"
              >
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  View All Articles
                </motion.span>
              </Link>
            </motion.div>
          </Transition>
        )}
      </div>
    </section>
  );
}

export default Blogs;

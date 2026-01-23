"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";

import { HeaderProps } from "../utils/types";
import { TextReveal } from "./ui/Typography";
import { useMediaQuery } from "../utils/useMediaQuery";
import Link from "next/link";
import { ArrowUpRight } from "./ui/Icons";
import { Transition } from "./ui/Transitions";
import { trackLinkClick, trackEvent, trackSocialShare } from "../utils/events";
import { cn } from "../utils/cn";

const Header = ({ social }: HeaderProps) => {
  const [isActive, setIsActive] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const variants: Variants = {
    open: {
      clipPath: `inset(0% 0% 0% 0% round ${isMobile ? 0 : "24px"})`,
      transition: {
        duration: 0.75,
        type: "tween",
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    closed: {
      clipPath: `inset(5% 12% 93% 85% round ${isMobile ? 0 : "24px"})`,
      transition: {
        duration: 0.75,
        delay: 0.35,
        type: "tween",
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  return (
    <motion.header className="fixed top-0 md:mt-12 md:mr-12 right-0 z-20">
      <Transition className="fixed md:top-8 top-6 md:left-8 left-6 z-30">
        <Link
          href={"/"}
          onClick={() => trackLinkClick("/", "Logo/Home")}
          className="focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black rounded"
          aria-label="Navigate to homepage"
        >
          <TextReveal className="font-semibold ">Lucas</TextReveal>
        </Link>
      </Transition>
      <motion.div
        initial={false}
        animate={isActive ? "open" : "closed"}
        variants={variants}
        className={
          cn("absolute top-0 right-0 md:-top-6 md:-right-6 w-dvw md:w-[480px] h-dvh md:h-[calc(100dvh-2.5rem)] bg-[#65bccd]",
            isActive ? "" : "hidden",
          )
        }
      >
        {isActive && (
          <nav className="flex justify-between flex-col w-full h-full px-10 pt-[100px] pb-[50px]">
            <div className="flex gap-2 flex-col">
              {navLinks.map((link, i) => {
                const { title, href } = link;
                const handleClick = (e: React.MouseEvent) => {
                  e.preventDefault();
                  setIsActive(false);

                  // Track navigation event
                  trackLinkClick(href, title);

                  if (href.startsWith('#')) {
                    // Wait for menu animation to close before scrolling
                    setTimeout(() => {
                      const element = document.querySelector(href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 300);
                  } else if (href === '/') {
                    // Scroll to top for home
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 300);
                  } else {
                    // For other routes like /blog, let Next.js Link handle navigation
                    // Menu will close automatically
                  }
                };

                return (
                  <div key={`b_${i}`}>
                    <Link
                      href={href}
                      className="flex flex-wrap overflow-hidden focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 focus:ring-offset-[#65bccd] rounded"
                      onClick={handleClick}
                      aria-label={href.startsWith('#') ? `Navigate to ${title} section` : `Navigate to ${title} page`}
                    >
                      <motion.div
                        variants={perspective}
                        custom={i}
                        initial="initial"
                        animate="enter"
                        whileHover="whileHover"
                        whileTap="whileHover"
                        exit="exit"
                        className="text-5xl text-slate-950 flex items-center justify-between"
                      >
                        <motion.span
                          variants={{
                            initial: { x: -20 },
                            whileHover: { x: 0 },
                          }}
                          aria-hidden="true"
                        >
                          <ArrowUpRight aria-hidden="true" />
                        </motion.span>
                        <motion.span
                          variants={{
                            initial: { x: 0 },
                            whileHover: { x: 20 },
                          }}
                        >
                          {title}
                        </motion.span>
                      </motion.div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <motion.div className="flex flex-wrap">
              {social.map((link, i) => {
                const { platform, _id, url } = link;
                return (
                  <motion.a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-1/2 mt-1 text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 focus:ring-offset-[#65bccd] rounded"
                    variants={slideIn}
                    custom={i}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    key={_id}
                    onClick={() => trackSocialShare(platform, url)}
                    aria-label={`Visit ${platform} profile (opens in new tab)`}
                  >
                    <TextReveal>{platform}</TextReveal>
                  </motion.a>
                );
              })}
            </motion.div>
          </nav>
        )}
      </motion.div>
      <Button
        isActive={isActive}
        toggleMenu={() => {
          setIsActive(!isActive);
        }}
      />
    </motion.header>
  );
};

export default Header;

function Button({
  isActive,
  toggleMenu,
}: {
  isActive: boolean;
  toggleMenu: () => void;
}) {
  const handleToggle = () => {
    toggleMenu();
    trackEvent({
      category: "engagement",
      action: isActive ? "close_menu" : "open_menu",
      label: "Navigation Menu",
    });
  };

  return (
    <div className="absolute md:top-0 top-4 right-4 md:right-0 w-[100px] h-10 rounded-full overflow-hidden cursor-pointer">
      <motion.div
        className="relative w-full h-full"
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] as const }}
      >
        <motion.button
          className="bg-[#65bccd] h-full w-full grid place-items-center text-black border-0 cursor-pointer"
          onClick={handleToggle}
          aria-label="Open navigation menu"
          aria-expanded={isActive}
        >
          <TextReveal>Menu</TextReveal>
        </motion.button>
        <motion.button
          className="bg-black h-full w-full grid place-items-center border-0 cursor-pointer"
          onClick={handleToggle}
          aria-label="Close navigation menu"
          aria-expanded={isActive}
        >
          <TextReveal>Close</TextReveal>
        </motion.button>
      </motion.div>
    </div>
  );
}

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Projects",
    href: "#services",
  },
  {
    title: "Experience",
    href: "#experience",
  },
  {
    title: "Blog",
    href: "#blog",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];

const perspective = {
  initial: {
    y: 50,
  },
  enter: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1] as const,
      opacity: { duration: 0.35 },
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween" as const, ease: [0.76, 0, 0.24, 1] as const },
  },
};

const slideIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween" as const, ease: [0.76, 0, 0.24, 1] as const },
  },
};

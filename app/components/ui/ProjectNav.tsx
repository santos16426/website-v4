"use client";

import { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

interface ProjectNavProps {
  items: NavItem[];
}

export function ProjectNav({ items }: ProjectNavProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const updateActiveSection = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + windowHeight;

      // Check if we're at or near the bottom of the page
      const isNearBottom = documentHeight - scrollBottom < 150;

      if (isNearBottom && items.length > 0) {
        // At bottom, activate the last section
        setActiveId(items[items.length - 1].id);
        return;
      }

      // Find the section that's currently in the viewport center
      const viewportCenter = scrollTop + windowHeight / 2;
      let activeSection = items[0]?.id || "";

      // Check each section to find which one is closest to viewport center
      for (let i = items.length - 1; i >= 0; i--) {
        const element = document.getElementById(items[i].id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = scrollTop + rect.top;
          const elementBottom = elementTop + rect.height;

          // If viewport center is within this section, or this section is above center
          if (viewportCenter >= elementTop && viewportCenter <= elementBottom) {
            activeSection = items[i].id;
            break;
          }
          // If we've scrolled past this section, use it
          if (elementTop < viewportCenter) {
            activeSection = items[i].id;
            break;
          }
        }
      }

      setActiveId(activeSection);
    };

    // Initial check
    updateActiveSection();

    // Update on scroll
    const handleScroll = () => {
      updateActiveSection();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-10 max-h-[80vh] overflow-y-auto">
      <div className="min-w-[180px] max-w-[220px]">
        <h4 className="text-xs font-medium text-foreground/50 uppercase tracking-wider mb-3 px-1">
          On this page
        </h4>
        <div className="flex flex-col gap-0.5">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left transition-all duration-200 group relative w-full focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black rounded"
              aria-label={`Navigate to ${item.label} section`}
              aria-current={activeId === item.id ? "true" : "false"}
            >
              <span
                className={`text-sm transition-all duration-200 block py-1.5 px-1 break-words overflow-wrap-anywhere ${
                  activeId === item.id
                    ? "text-white font-medium pl-5"
                    : "text-foreground/50 hover:text-foreground/80"
                }`}
              >
                {item.label}
              </span>
              {activeId === item.id && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-400 rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

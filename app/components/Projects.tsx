"use client";

import { useState } from "react";

import { ProjectsProps } from "../utils/types";
import { SlideIn, Transition } from "./ui/Transitions";
import { SectionHeading } from "./ui/Typography";
import { HoverImage } from "./ui/HoverImage";
import { HandHelping, ChevronDown } from "lucide-react";

function Projects({ projects }: ProjectsProps) {
  const [showAll, setShowAll] = useState(false);
  const initialLimit = 3;
  const displayedProjects = showAll ? projects : projects.slice(0, initialLimit);
  const hasMore = projects.length > initialLimit;

  return (
    <section className="px-2 py-20 relative" id="services">
      <span className="blob absolute top-[20%] right-0 w-1/3 h-5/6 blur-[100px] rotate-180 -z-10 opacity-50" />
      <SectionHeading className="">
          <SlideIn className="text-white/40">
            <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-950/55 px-4 py-2 text-emerald-300">
              <HandHelping  className="size-4" />
              <h2 className="text-sm font-medium tracking-wide max-sm:text-xs">Projects and Case Studies</h2>
            </div>
          </SlideIn>
        </SectionHeading>
      <div className="mx-auto">
        {displayedProjects.map((project) => (
          <Transition key={project._id}>
            <HoverImage
              heading={project.name}
              projectDate={project.details.projectDate}
              imgSrc={project.image.url}
              shortDescription={project.shortDescription}
              techStack={project.details.techStack}
            />
          </Transition>
        ))}
      </div>
      {hasMore && (
        <Transition className="flex items-center justify-center py-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/50 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-foreground/70 hover:text-foreground"
          >
            <span>{showAll ? "Show Less" : "Show More"}</span>
            <ChevronDown 
              className={`size-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} 
            />
          </button>
        </Transition>
      )}
    </section>
  );
}

export default Projects;

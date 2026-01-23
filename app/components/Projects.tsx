"use client";

import { useState } from "react";
import { ProjectsProps } from "../utils/types";
import { SlideIn, Transition } from "./ui/Transitions";
import { SectionHeading } from "./ui/Typography";
import { HoverImage } from "./ui/HoverImage";
import { HandHelping, ChevronDown } from "lucide-react";

interface ProjectsComponentProps extends ProjectsProps {
  showAll?: boolean;
}

function Projects({ projects, showAll = false }: ProjectsComponentProps) {
  const [showAllState, setShowAllState] = useState(false);
  const initialLimit = 3;
  const displayedProjects = showAll 
    ? projects 
    : showAllState 
      ? projects 
      : projects.slice(0, initialLimit);
  const hasMore = !showAll && projects.length > initialLimit;

  return (
    <section className="px-2 py-20 relative" id="services">
      <span className="blob absolute top-[20%] right-0 w-1/3 h-5/6 blur-[100px] rotate-180 -z-10 opacity-50" />
      <SectionHeading className="">
          <SlideIn className="text-white/40">
            <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-950/55 px-4 py-2 text-emerald-300">
              <HandHelping className="size-4" aria-hidden="true" />
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
              alias={project.alias}
            />
          </Transition>
        ))}
      </div>
      {hasMore && (
        <Transition className="flex items-center justify-center py-10">
          <button
            onClick={() => setShowAllState(!showAllState)}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/50 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-foreground/70 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
            aria-label={showAllState ? "Show fewer projects" : `Show all ${projects.length} projects`}
            aria-expanded={showAllState}
          >
            <span>{showAllState ? "Show Less" : "Show More"}</span>
            <ChevronDown
              className={`size-4 transition-transform duration-300 ${showAllState ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
        </Transition>
      )}
    </section>
  );
}

export default Projects;

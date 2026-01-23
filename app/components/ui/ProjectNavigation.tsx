"use client";

import Link from "next/link";
import Image from "next/image";
import { Project } from "../../utils/interface";
import { ArrowRight, Grid3x3 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { trackLinkClick, trackProjectView, trackEvent } from "../../utils/events";

interface ProjectNavigationProps {
  currentProject: Project;
  allProjects: Project[];
}

export function ProjectNavigation({
  currentProject,
  allProjects,
}: ProjectNavigationProps) {
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Filter out disabled projects
  const enabledProjects = allProjects.filter((p) => !p.disabled);

  // Find next project (circular) - use enabled projects to maintain order
  const currentIndex = enabledProjects.findIndex(
    (p) => p.alias === currentProject.alias
  );
  const nextProject =
    enabledProjects.length > 1 && currentIndex !== -1
      ? enabledProjects[(currentIndex + 1) % enabledProjects.length]
      : null;

  // Filter out current project for the "all projects" view
  const availableProjects = enabledProjects.filter(
    (p) => p.alias !== currentProject.alias
  );

  if (availableProjects.length === 0) return null;

  return (
    <div className="border-t border-white/10 pt-12 mt-12">
      <div className="flex flex-col gap-6">
        {/* Next Project Button */}
        {nextProject && (
          <Link
            href={`/project/${nextProject.alias}`}
            className="group flex items-center justify-between p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-400/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
            onClick={() => {
              trackLinkClick(`/project/${nextProject.alias}`, "Next Project");
              trackProjectView(nextProject.name, nextProject.alias);
            }}
            aria-label={`Navigate to next project: ${nextProject.name}`}
          >
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border border-white/10 shrink-0">
                <Image
                  src={nextProject.image.url}
                  alt={nextProject.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div>
                <p className="text-sm text-foreground/50 mb-1">Next Project</p>
                <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                  {nextProject.name}
                </h3>
                <p className="text-sm text-foreground/60 mt-1 line-clamp-1">
                  {nextProject.shortDescription}
                </p>
              </div>
            </div>
            <ArrowRight className="size-5 text-foreground/50 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" aria-hidden="true" />
          </Link>
        )}

        {/* View All Projects Toggle */}
        <button
          onClick={() => {
            setShowAllProjects(!showAllProjects);
            trackEvent({
              category: "engagement",
              action: showAllProjects ? "hide_all_projects" : "view_all_projects",
              label: "Project Navigation",
            });
          }}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-foreground/70 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
          aria-label={showAllProjects ? `Hide all ${availableProjects.length} projects` : `View all ${availableProjects.length} projects`}
          aria-expanded={showAllProjects}
        >
          <Grid3x3 className="size-4" aria-hidden="true" />
          <span>
            {showAllProjects ? "Hide" : "View"} All Projects ({availableProjects.length})
          </span>
        </button>

        {/* All Projects Grid */}
        <AnimatePresence>
          {showAllProjects && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {availableProjects.map((project) => (
                  <Link
                    key={project._id}
                    href={`/project/${project.alias}`}
                    className="group relative p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-400/50 transition-all duration-300"
                    onClick={() => {
                      trackLinkClick(`/project/${project.alias}`, project.name);
                      trackProjectView(project.name, project.alias);
                    }}
                  >
                    <div className="relative w-full h-32 rounded-lg overflow-hidden border border-white/10 mb-3">
                      <Image
                        src={project.image.url}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300 mb-1">
                      {project.name}
                    </h4>
                    <p className="text-xs text-foreground/60 line-clamp-2">
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.details.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs text-foreground/50 bg-white/5 rounded-full px-2 py-0.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

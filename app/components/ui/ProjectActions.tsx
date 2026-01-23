"use client";

import { ExternalLink, Github, Mail } from "lucide-react";
import { trackLinkClick, trackEvent, trackContactSubmission } from "../../utils/events";

interface ProjectActionsProps {
  githubUrl?: string;
  liveUrl?: string;
  contactEmail: string;
  projectName: string;
}

export function ProjectActions({ githubUrl, liveUrl, contactEmail, projectName }: ProjectActionsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/50 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-foreground/70 hover:text-foreground"
          onClick={() => {
            trackLinkClick(githubUrl, "View on GitHub");
            trackEvent({
              category: "project",
              action: "github_click",
              label: projectName,
              url: githubUrl,
            });
          }}
        >
          <Github className="size-4" />
          <span>View on GitHub</span>
        </a>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/50 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-foreground/70 hover:text-foreground"
          onClick={() => {
            trackLinkClick(liveUrl, "Live Demo");
            trackEvent({
              category: "project",
              action: "live_demo_click",
              label: projectName,
              url: liveUrl,
            });
          }}
        >
          <ExternalLink className="size-4" />
          <span>Live Demo</span>
        </a>
      )}
      {!githubUrl && !liveUrl && (
        <a
          href={`mailto:${contactEmail}?subject=Inquiry about ${projectName}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/50 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-foreground/70 hover:text-foreground"
          onClick={() => {
            trackContactSubmission("email");
            trackEvent({
              category: "contact",
              action: "project_inquiry",
              label: projectName,
            });
          }}
        >
          <Mail className="size-4" />
          <span>Contact Me</span>
        </a>
      )}
    </div>
  );
}

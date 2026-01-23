import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/header";
import { Portfolio, Project } from "../../utils/interface";
import { SlideIn, Transition } from "../../components/ui/Transitions";
import { SectionHeading } from "../../components/ui/Typography";
import { ProjectNav } from "../../components/ui/ProjectNav";
import { ProjectGallery } from "../../components/ui/ProjectGallery";
import { ProjectNavigation } from "../../components/ui/ProjectNavigation";
import { ArrowLeft, ExternalLink, Github, Mail } from "lucide-react";

interface ProjectDetailPageProps {
  params: Promise<{ alias: string }>;
}

async function getProject(alias: string): Promise<Project | null> {
  const portfolio = (await import("../../siteConfig.json")).default;
  const { projects } = portfolio as Portfolio;
  return projects.find((p) => p.alias === alias) || null;
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { alias } = await params;
  const project = await getProject(alias);

  if (!project) {
    notFound();
  }

  const portfolio = (await import("../../siteConfig.json")).default;
  const { social_handles } = portfolio as Portfolio;

  const navItems = [];
  navItems.push({ id: "overview", label: "Overview" });
  if (project.goalsAndMotivation) {
    navItems.push({ id: "goals-and-motivation", label: "Goals and Motivation" });
  }
  navItems.push({ id: "tech-stack", label: "Tech Stack Used" });
  if (project.features && project.features.length > 0) {
    navItems.push({ id: "features", label: "Features" });
  }
  if (project.challenges && project.challenges.length > 0) {
    navItems.push({ id: "challenges", label: "Challenges" });
  }
  if (project.gallery && project.gallery.length > 0) {
    navItems.push({ id: "gallery", label: "Gallery" });
  }
  if (project.githubUrl || project.liveUrl) {
    navItems.push({ id: "repositories", label: "Repositories" });
  }
  if (project.outro) {
    navItems.push({ id: "outro", label: "Outro" });
  }

  return (
    <main className="relative min-h-screen">
      <Header social={social_handles} />
      <ProjectNav items={navItems} />
      <div className="px-2 py-20 relative max-w-6xl mx-auto">
        <span className="blob absolute top-[20%] right-0 w-1/3 h-5/6 blur-[100px] rotate-180 -z-10 opacity-50" />

        <Transition className="mb-8">
          <Link
            href="/project"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors duration-300"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Projects</span>
          </Link>
        </Transition>

        <div className="mb-12">
          <SectionHeading>
            <SlideIn>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {project.name}
              </h1>
            </SlideIn>
            <Transition>
              <div className="flex flex-wrap items-center gap-4 text-foreground/70">
                <span className="text-sm">{project.details.type}</span>
                <span className="text-sm">•</span>
                <span className="text-sm">{project.details.projectDate}</span>
              </div>
            </Transition>
          </SectionHeading>
        </div>

        {/* Project Image */}
        <Transition className="mb-12">
          <div className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden border border-white/10">
            <Image
              src={project.image.url}
              alt={project.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </Transition>

        <div className="max-w-4xl mx-auto">
          <div id="overview" className="mb-12">
            <Transition>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                Overview
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p className="text-lg">
                  {project.shortDescription}
                </p>
                {project.fullDescription && (
                  <p className="text-base">
                    {project.fullDescription}
                  </p>
                )}
              </div>
            </Transition>
          </div>

          {project.goalsAndMotivation && (
            <div id="goals-and-motivation" className="mb-12">
              <Transition>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  Goals and Motivation
                </h2>
                <div className="space-y-6 text-foreground/70 leading-relaxed">
                  {project.goalsAndMotivation.introduction && (
                    <p className="text-base">
                      {project.goalsAndMotivation.introduction}
                    </p>
                  )}
                  {project.goalsAndMotivation.goals && project.goalsAndMotivation.goals.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Goals</h3>
                      <ul className="space-y-2">
                        {project.goalsAndMotivation.goals.map((goal, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-emerald-400 mt-1">•</span>
                            <span className="text-base">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.goalsAndMotivation.motivation && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Motivation</h3>
                      <p className="text-base whitespace-pre-line">
                        {project.goalsAndMotivation.motivation}
                      </p>
                    </div>
                  )}
                </div>
              </Transition>
            </div>
          )}

          <div id="tech-stack" className="mb-12">
            <Transition>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                Tech Stack Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.details.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-white/20 bg-white/5 text-foreground/70 hover:bg-white/10 hover:border-emerald-400/30 hover:text-foreground transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Transition>
          </div>

          {project.features && project.features.length > 0 && (
            <div id="features" className="mb-12">
              <Transition>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  Features
                </h2>
                <ul className="space-y-3 text-foreground/70">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span className="text-base leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Transition>
            </div>
          )}

          {project.challenges && project.challenges.length > 0 && (
            <div id="challenges" className="mb-12">
              <Transition>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  Challenges
                </h2>
                <div className="space-y-6">
                  {project.challenges.map((challenge, index) => (
                    <div
                      key={index}
                      className="text-base text-foreground/70 leading-relaxed"
                    >
                      <p>{challenge}</p>
                    </div>
                  ))}
                </div>
              </Transition>
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div id="gallery" className="mb-12">
              <Transition>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  Gallery
                </h2>
                <ProjectGallery images={project.gallery} projectName={project.name} />
              </Transition>
            </div>
          )}

          {/* Repositories */}
          <div id="repositories" className="mb-12">
            <Transition>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                Repositories
              </h2>
              <div className="flex flex-wrap gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/50 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-foreground/70 hover:text-foreground"
                  >
                    <Github className="size-4" />
                    <span>View on GitHub</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/50 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-foreground/70 hover:text-foreground"
                  >
                    <ExternalLink className="size-4" />
                    <span>Live Demo</span>
                  </a>
                )}
                {!project.githubUrl && !project.liveUrl && (
                  <a
                    href={`mailto:${portfolio.about.contactEmail}?subject=Inquiry about ${project.name}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/50 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-foreground/70 hover:text-foreground"
                  >
                    <Mail className="size-4" />
                    <span>Contact Me</span>
                  </a>
                )}
              </div>
            </Transition>
          </div>

          {/* Outro */}
          {project.outro && (
            <div id="outro" className="mb-12">
              <Transition>
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  Outro
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-base text-foreground/70 leading-relaxed whitespace-pre-line">
                    {project.outro}
                  </p>
                </div>
              </Transition>
            </div>
          )}

          {/* Project Navigation */}
          <Transition>
            <ProjectNavigation
              currentProject={project}
              allProjects={portfolio.projects}
            />
          </Transition>
        </div>
      </div>
    </main>
  );
}

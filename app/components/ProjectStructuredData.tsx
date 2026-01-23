import { siteConfig } from "../utils/site";
import { Project } from "../utils/interface";

interface ProjectStructuredDataProps {
  project: Project;
}

export default function ProjectStructuredData({ project }: ProjectStructuredDataProps) {
  const projectUrl = `${siteConfig.url}/project/${project.alias}`;

  // SoftwareApplication structured data
  const softwareApplicationStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.shortDescription || project.fullDescription || project.name,
    image: project.image?.url ? [project.image.url] : [siteConfig.ogImage],
    url: projectUrl,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    ...(project.details?.techStack && project.details.techStack.length > 0 && {
      softwareRequirements: project.details.techStack.join(", "),
    }),
    ...(project.liveUrl && {
      offers: {
        "@type": "Offer",
        url: project.liveUrl,
        price: "0",
        priceCurrency: "USD",
      },
    }),
    ...(project.githubUrl && {
      codeRepository: project.githubUrl,
    }),
  };

  // BreadcrumbList structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteConfig.url}/project`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: projectUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
    </>
  );
}

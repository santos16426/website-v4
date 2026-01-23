import Projects from "../components/Projects";
import Header from "../components/header";
import { Portfolio } from "../utils/interface";

export default async function ProjectListPage() {
  const portfolio = (await import("../siteConfig.json")).default;
  const { projects, social_handles } = portfolio as Portfolio;

  // Filter out disabled projects for the list page
  const enabledProjects = projects.filter((p) => !p.disabled);

  return (
    <main className="relative">
      <Header social={social_handles} />
      <Projects projects={enabledProjects} showAll={true} />
    </main>
  );
}

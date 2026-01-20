import About from "./components/about";
import Contact from "./components/Contact";
import Header from "./components/header";
import Hero from "./components/hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import StructuredData from "./components/StructuredData";
import { Portfolio } from "./utils/interface";

export default async function Home() {
  const portfolio = (await import("./siteConfig.json")).default;

  const {
    about,
    experience,
    projects,
    social_handles,
    skills,
  } = portfolio as Portfolio;

  return (
    <main className="relative">
      <StructuredData about={about} socialHandles={social_handles} />
      <Header social={social_handles} />
      <Hero about={about} />
      <About about={about} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Contact email={about.contactEmail}/>
    </main>
  );
}

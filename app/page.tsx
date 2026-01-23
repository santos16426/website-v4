import About from "./components/about";
import Contact from "./components/Contact";
import Header from "./components/header";
import Hero from "./components/hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Blogs from "./components/Blogs";
import StructuredData from "./components/StructuredData";
import { Portfolio } from "./utils/interface";
import LoaderWrapper from "./components/LoaderWrapper";

export default async function Home() {
  const portfolio = (await import("./siteConfig.json")).default;

  const {
    about,
    experience,
    projects,
    blogs,
    social_handles,
    skills,
  } = portfolio as Portfolio;

  return (
    <main className="relative">
      <LoaderWrapper subTitle={about.subTitle}>

      <StructuredData about={about} socialHandles={social_handles} />
      <Header social={social_handles} />
      <Hero about={about} />
      <About about={about} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      {blogs && blogs.length > 0 && <Blogs blogs={blogs} />}
      <Contact email={about.contactEmail} />
      </LoaderWrapper>
    </main>
  );
}

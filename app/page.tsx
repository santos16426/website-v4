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
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-white focus:rounded-lg focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
      >
        Skip to main content
      </a>
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

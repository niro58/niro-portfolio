import { AboutMe } from "@/components/about-me";
import { Contacts } from "@/components/contacts";
import { CurrentStack } from "@/components/current-stack";
import { Hero } from "@/components/hero";
import { LatestProjects } from "@/components/latest-projects";
import { Portfolio } from "@/components/portfolio";

export default function Home() {
  return (
    <main>
      <Hero />
      <div
        className="min-h-screen bg-gradient-to-b from-slate-900 to-background"
        id="about-me"
      >
        <AboutMe />
      </div>
      <div id="stack">
        <CurrentStack />
      </div>
      <div
        className="min-h-screen bg-gradient-to-b from-slate-900 to-background"
        id="projects"
      >
        <LatestProjects />
      </div>
      <div id="portfolio">
        <Portfolio />
      </div>
      <div id="contact">
        <Contacts />
      </div>
    </main>
  );
}

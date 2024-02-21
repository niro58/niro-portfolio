import { About } from "@/components/about";
import { ActiveProjects } from "@/components/active-projects";
import { Contacts } from "@/components/contacts";
import { CurrentStack } from "@/components/current-stack";
import { Hero } from "@/components/hero";
import RecentPosts from "@/components/recent-posts";
import { Socials } from "@/components/socials";

export default function Home() {
  return (
    <main>
      <Hero />
      <div id="about">
        <About />
      </div>
      <Socials />
      <div id="stack">
        <CurrentStack />
      </div>
      <div id="projects">
        <ActiveProjects />
      </div>
      <RecentPosts />
    </main>
  );
}

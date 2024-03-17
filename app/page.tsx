import { About } from "@/components/about";
import { CurrentStack } from "@/components/current-stack";
import { Hero } from "@/components/hero";
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
      {/* <div id="projects">
        <ActiveProjects />
      </div>
      <RecentPostsRender />
      <Contacts /> */}
    </main>
  );
}

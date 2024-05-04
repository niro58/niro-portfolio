import { AboutMe } from "@/components/about-me";
import { CurrentStack } from "@/components/current-stack";
import { Hero } from "@/components/hero";
import { LatestProjects } from "@/components/latest-projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-primary/50">
        <AboutMe />
      </div>
      <div className="min-h-screen ">
        <LatestProjects />
      </div>
      <CurrentStack />
    </main>
  );
}

import { AboutMe } from "@/components/about-me";
import { CurrentStack } from "@/components/current-stack";
import { LatestProjects } from "@/components/latest-projects";

export default function Home() {
  return (
    <main>
      {/* <Hero /> */}
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-background">
        <AboutMe />
      </div>
      <div className="min-h-screen ">
        <LatestProjects />
      </div>
      <CurrentStack />
    </main>
  );
}

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
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-background">
        <AboutMe />
      </div>
      <CurrentStack />
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-background">
        <LatestProjects />
      </div>
      <Portfolio />
      <Contacts />
    </main>
  );
}

import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="z-20 min-h-screen">a</div>
      <div className="min-h-screen bg-secondary">b</div>
      <div className="min-h-screen bg-primary">c</div>
      {/* <Hero />
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-primary/50">
        <AboutMe />
      </div>
      <div className="min-h-screen ">
        <LatestProjects />
      </div>
      <CurrentStack /> */}
    </main>
  );
}

import { LatestProjects } from "@/components/latest-projects";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-background">
        <LatestProjects />
      </div>
    </main>
  );
}

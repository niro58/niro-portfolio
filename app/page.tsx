import { About } from "@/components/about";
import { ActiveProjects } from "@/components/active-projects";
import { Contacts } from "@/components/contacts";
import { Hero } from "@/components/hero";
import { RecentPosts } from "@/components/recent-posts";
import { Skills } from "@/components/skills";
import { Socials } from "@/components/socials";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Socials />
      <Skills />
      <ActiveProjects />
      <RecentPosts />
      <Contacts />
    </main>
  );
}

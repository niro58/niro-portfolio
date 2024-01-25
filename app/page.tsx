import { About } from "@/components/about";
import { Contacts } from "@/components/contacts";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import { Skills } from "@/components/skills";
import { Socials } from "@/components/socials";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Portfolio />
      <Skills />
      <Contacts />
    </main>
  );
}

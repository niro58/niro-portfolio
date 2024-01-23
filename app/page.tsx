import { About } from "@/components/about";
import { Contacts } from "@/components/contacts";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { Socials } from "@/components/socials";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Contacts />
    </main>
  );
}

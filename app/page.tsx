import { AboutMe } from "@/components/about-me";
import { Contacts } from "@/components/contacts";
import { CurrentStack } from "@/components/current-stack";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import outputs from '@/amplify_outputs.json';
import { Amplify } from 'aws-amplify';

Amplify.configure(outputs, {
  ssr: true 
});
export default function Home() {
  return (
    <main>
      <Hero />
      <div
        className="min-h-screen bg-gradient-to-b from-slate-900 to-background"
        id="about"
      >
        <AboutMe />
      </div>
      <div id="stack">
        <CurrentStack />
      </div>
      <div id="portfolio">
        <Portfolio />
      </div>
      <div id="contact">
        <Contacts />
      </div>
    </main>
  );
}

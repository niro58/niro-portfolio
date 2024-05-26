import { GetPost } from "@/lib/api-utils/api-utils-post";
import { MoreHorizontalIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export async function LatestProjects() {
  const currentProjects = [
    "steam-trader",
    "vjm-frigotrans-02",
    "vjm-truck-fleet"
  ];
  let data = [];
  for (let project of currentProjects) {
    const res = await GetPost(project);
    const { frontmatter } = res;
    data.push({
      slug: project,
      frontmatter: frontmatter
    });
  }
  const images = [
    "/images/posts/steam-trader.jpg",
    "/images/posts/vjm-frigotrans-02.jpg",
    "/images/posts/vjm-truck-fleet.jpg"
  ];

  return (
    <section className="container h-screen w-full py-12 md:py-8 lg:py-16">
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-2  lg:gap-5">
        <div className="font-thin tracking-wide">
          <div>
            <div className="text-start text-6xl/tight font-thin tracking-wide">
              Some of projects that
              <br /> I am working on
            </div>
          </div>
        </div>
        {data.map((project, index) => (
          <div
            key={index}
            className="flex h-full flex-col rounded-xl border border-primary bg-background/50 p-5"
          >
            <div className="flex flex-row justify-between">
              <div className="text-2xl font-bold">
                <Link
                  href={`/post/${project.slug}`}
                  className="transition-colors hover:text-primary/50"
                >
                  {project.frontmatter.title}
                </Link>
              </div>

              <Button size="icon" variant="ghost">
                <Link href={`/post/${project.slug}`}>
                  <MoreHorizontalIcon className="h-6 w-6" />
                </Link>
              </Button>
            </div>
            <div className="text-neutral-400"></div>
            <div>
              {project.frontmatter.categories.map((category, index) => (
                <Badge key={index} className="mr-2" variant="outline">
                  {category}
                </Badge>
              ))}
            </div>
            <div className="grid h-full grid-cols-2">
              <p className="pt-3 text-lg">
                {project.frontmatter.short_description}
              </p>
              <Image
                src={images[index]}
                alt={project.frontmatter.title}
                width={500}
                height={300}
                className="place-self-center rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

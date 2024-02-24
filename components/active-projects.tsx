import { GetPost } from "@/lib/api-utils/api-utils-post";
import { blank_frontmatter } from "@/lib/post-interfaces";
import { MoreHorizontalIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export async function ActiveProjects() {
  const currentProjects = [
    "steam-trader",
    "vjm-frigotrans-02",
    "vjm-truck-fleet"
  ];
  let data = [];
  for (let project of currentProjects) {
    const res = await GetPost(project);
    const { frontmatter } = res;
    data.push(frontmatter);
  }
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center bg-gradient-to-b from-neutral-900 to-background">
      <div className="grid grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 lg:gap-5  sm:w-10/12  py-24 px-5 lg:px-10">
        <div className="w-full mb-5 font-thin tracking-wide items-start flex flex-col justify-top">
          <div>
            <div className="text-6xl/tight  text-start font-thin tracking-wide">
              Some of projects that
              <br /> I am working on
            </div>
            <div className="text-2xl/relaxed text-start font-normal text-neutral-500 tracking-normal">
              All archive/current projects are available in my portfolio
            </div>
          </div>
        </div>
        <div className="h-full grid grid-rows-3 gap-2 lg:gap-5">
          {data.map((project, index) => (
            <Card key={index} className="w-full">
              <CardHeader className="pb-2 lg:pb-4">
                <CardTitle className="text-lg lg:text-2xl flex-col sm:flex-row flex justify-between items-center">
                  <span className="text-lg sm:text-xl lg:text-3xl order-2 sm:order-1 overflow-hidden text-overflow-ellipsis whitespace-normal">
                    {project.title}
                  </span>
                  <Link
                    className="sm:order-2 order-1"
                    href={`/post/${currentProjects[index]}`}
                    key={index}
                  >
                    <Button size="icon" variant="ghost">
                      <MoreHorizontalIcon className="w-6 h-6" />
                    </Button>
                  </Link>
                </CardTitle>
                <CardDescription className="text-secondary text-base sm:text-lg lg:text-xl ">
                  {project.short_description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-2 lg:p-6">
                <Image
                  alt="Creative Portfolio Showcase"
                  className="aspect-video object-cover rounded-lg"
                  width="500"
                  height="250"
                  src={project.header_img}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

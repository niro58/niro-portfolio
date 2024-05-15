import { GetPost } from "@/lib/api-utils/api-utils-post";
import { MoreHorizontalIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "./ui/card";

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
    data.push(frontmatter);
  }
  return (
    <section className="flex w-full justify-center py-12 md:py-24 lg:py-32">
      <div className="px-5 py-24 sm:w-10/12 lg:gap-5 lg:px-10">
        <div className="grid h-full grid-cols-2 grid-rows-2 gap-2 lg:gap-5">
          <div className="justify-top mb-5 flex w-full flex-col items-start font-thin tracking-wide">
            <div>
              <div className="text-start text-6xl/tight font-thin tracking-wide">
                Some of projects that
                <br /> I am working on
              </div>
            </div>
          </div>
          {data.map((project, index) => (
            <Card key={index} className="w-full">
              <CardHeader className="pb-2 lg:pb-4">
                <CardTitle className="flex flex-col items-center justify-between text-lg sm:flex-row lg:text-2xl">
                  <span className="text-overflow-ellipsis order-2 overflow-hidden whitespace-normal text-lg sm:order-1 sm:text-xl lg:text-3xl">
                    {project.title}
                  </span>
                  <Link
                    className="order-1 sm:order-2"
                    href={`/post/${currentProjects[index]}`}
                    key={index}
                  >
                    <Button size="icon" variant="ghost">
                      <MoreHorizontalIcon className="h-6 w-6" />
                    </Button>
                  </Link>
                </CardTitle>
                <CardDescription className="text-base text-secondary sm:text-lg lg:text-xl ">
                  {project.short_description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-2 lg:p-6">
                <Image
                  alt="Creative Portfolio Showcase"
                  className="aspect-video rounded-lg object-cover"
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

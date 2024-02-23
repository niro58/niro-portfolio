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
    <div className="flex flex-col content-center py-24 px-10 bg-neutral-900">
      <div className="text-center w-full text-4xl mb-5 font-thin tracking-wide pt-24">
        <div className="text-4xl font-thin tracking-wide">
          Currently projects that I am working on
        </div>
        <div className="text-xl/relaxed font-normal text-gray-600 tracking-normal">
          All archive/current projects are available in my portfolio
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 items-center justify-between">
        {data.map((project, index) => (
          <Card key={index}>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex-row flex justify-between items-center">
                <div>{project.title}</div>
                <Link href={`/post/${currentProjects[index]}`} key={index}>
                  <Button className="ml-auto" size="icon" variant="ghost">
                    <MoreHorizontalIcon className="w-6 h-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </Link>
              </CardTitle>
              <CardDescription className="text-primary/70">
                {project.short_description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-6">
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
  );
}

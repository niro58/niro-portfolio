import { GetPosts } from "@/lib/api-utils/api-utils-post";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export async function Portfolio() {
  let data = [];
  const posts = await GetPosts();
  for (let project of posts) {
    data.push(project);
  }
  return (
    <section className="flex w-full justify-center bg-gradient-to-b from-background to-primary/20 py-12 md:py-24 lg:py-32">
      <div className="px-5 py-24 sm:w-10/12 lg:gap-5 lg:px-10">
        <div className="flex flex-col">
          <div className="justify-top mb-5 flex w-full flex-col items-start font-thin tracking-wide">
            <div>
              <div className="py-16 text-start text-6xl/tight font-thin tracking-wide">
                Portfolio
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {data.map((project, index) => (
              <div
                className="flex flex-col gap-2 rounded-lg border border-primary/20 bg-background/20 p-5"
                key={index}
              >
                <div className="flex flex-row items-center justify-between">
                  <div className="text-2xl font-bold">
                    {project.frontmatter.title}
                  </div>

                  <Button size="icon" variant="ghost">
                    <Link href={`/portfolio/${project.slug}`}>
                      <MoreHorizontalIcon className="h-6 w-6" />
                    </Link>
                  </Button>
                </div>
                <div className="text-neutral-400">
                  {String(project.frontmatter.start_date.getDate()).padStart(
                    2,
                    "0"
                  )}
                  -
                  {String(
                    project.frontmatter.start_date.getMonth() + 1
                  ).padStart(2, "0")}
                  -{project.frontmatter.start_date.getFullYear()}
                </div>
                <div>
                  {project.frontmatter.categories.map((category, index) => (
                    <Badge key={index} className="mr-2" variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>
                <p className="pt-3 text-lg">
                  {project.frontmatter.short_description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

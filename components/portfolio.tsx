import { GetPosts, OutputPost } from "@/lib/api-utils/api-utils-post";
import { DateToString } from "@/lib/dateToString";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const GridColumn = ({ data }: { data: OutputPost[] }) =>
  data.map((project, index) => (
    <div
      className="flex flex-col gap-2 rounded-lg border border-primary/20 bg-background/20 p-5"
      key={index}
    >
      <div className="flex flex-row items-center justify-between">
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
      <div className="text-neutral-400">
        {DateToString(project.frontmatter.start_date)} -{" "}
        {DateToString(project.frontmatter.end_date)}
      </div>
      <div>
        {project.frontmatter.categories.map((category, index) => (
          <Badge key={index} className="mr-2" variant="outline">
            {category}
          </Badge>
        ))}
      </div>
      <p className="pt-3 text-lg">{project.frontmatter.short_description}</p>
    </div>
  ));
export async function Portfolio() {
  let data = [];
  let gridData: OutputPost[][] = [[], [], []];
  const posts = await GetPosts();
  for (let project of posts) {
    data.push(project);
  }
  for (let i = 0; i < data.length; i++) {
    gridData[i % 3].push(data[i]);
  }
  return (
    <section className="flex w-full justify-center bg-gradient-to-b from-background to-primary/20 pt-12 md:pt-24 lg:pt-32">
      <div className="px-5 py-24 sm:w-10/12 lg:gap-5 lg:px-10">
        <div className="flex flex-col">
          <div className="justify-top mb-5 flex w-full flex-col items-start font-thin tracking-wide">
            <div className="text-start text-6xl/tight font-thin tracking-wide">
              Portfolio
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {gridData.map((data, index) => (
              <div className="grid grid-cols-1 gap-5" key={index}>
                <GridColumn data={data} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

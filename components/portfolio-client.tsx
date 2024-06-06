"use client";
import { OutputPost } from "@/lib/api-utils/api-utils-post";
import { DateToString } from "@/lib/dateToString";
import { cn } from "@/lib/utils";
import { ArrowBigDown, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
export const PortfolioPosts: React.FC<{ posts: OutputPost[][] }> = ({
  posts
}) => {
  const [page, setPage] = useState(0);

  return (
    <>
      <div
        className={cn(
          "grid gap-5 pb-5 md:grid-cols-3 md:[&>*:nth-child(2)]:grid md:[&>*:nth-child(3)]:grid",
          page < 1 && "[&>*:nth-child(2)]:hidden",
          page < 2 && "[&>*:nth-child(3)]:hidden"
        )}
      >
        {posts.map((data, index) => (
          <div className="grid grid-cols-1 gap-5" key={index}>
            <GridColumn data={data} />
          </div>
        ))}
      </div>
      {page < 2 && (
        <Button
          className="md:hidden"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Load more <ArrowBigDown className="h-6 w-6" />
        </Button>
      )}
    </>
  );
};

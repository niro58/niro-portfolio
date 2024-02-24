import { Frontmatter } from "@/lib/post-interfaces";
import { MoreHorizontalIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "./ui/card";

interface PostDescriptionProps {
  frontmatter: Frontmatter;
  slug: string;
}
export const PostDescription: React.FC<PostDescriptionProps> = ({
  frontmatter,
  slug
}) => {
  return (
    <Card className="bg-gradient-to-bl from-neutral-800 via-black  to-black">
      <CardHeader className="flex flex-col content-center justify-between ">
        <div className="flex flex-row justify-between items-center">
          <CardTitle>{frontmatter.title}</CardTitle>
          <Link href={`/post/${slug}`}>
            <Button className="ml-auto" size="icon" variant="ghost">
              <MoreHorizontalIcon className="w-6 h-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </Link>
        </div>
        <div className="flex flex-row gap-3">
          {frontmatter.categories.map((category, index) => (
            <Badge key={index} variant="secondary" className="text-sm">
              {category}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardDescription className="flex flex-col gap-4 px-4">
        {frontmatter.short_description}
      </CardDescription>
      <CardContent className="flex items-center justify-center p-6">
        <Image
          alt="Creative Portfolio Showcase"
          className="aspect-video object-cover rounded-lg"
          width="500"
          height="250"
          src={frontmatter.header_img}
        />
      </CardContent>
    </Card>
  );
};

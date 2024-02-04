import { DateToString } from "@/lib/date-to-string";
import { Frontmatter } from "@/lib/posts";
import Image from "next/image";
import { RxDoubleArrowRight } from "react-icons/rx";

import { Badge } from "./ui/badge";

interface PostDescriptionProps {
  frontmatter: Frontmatter;
}
export const PostDescription: React.FC<PostDescriptionProps> = ({
  frontmatter
}) => {
  return (
    <div className="bg-transparent grid grid-cols-2 grid-rows-1 p-10 rounded-lg border-2 shadow-md shadow-primary-foreground border-primary-foreground">
      <div>
        <div className="inline-flex justify-between">
          <div className="text-4xl text-primary">{frontmatter.title} </div>
        </div>
        <div className="pt-2 text-gray-400 text-xl">
          {frontmatter.categories.map((category, index) => (
            <Badge key={index} variant={"outline"} className="text-sm">
              {category}
            </Badge>
          ))}
          <div className="pt-5">
            <p>{frontmatter.short_description}</p>
          </div>
        </div>
      </div>
      <div className="h-64 flex items-center justify-end">
        <Image
          src={frontmatter.header_img}
          alt={frontmatter.title}
          className="rounded-lg"
          width={500}
          height={500}
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: "cover"
          }}
        />
      </div>
    </div>
  );
};

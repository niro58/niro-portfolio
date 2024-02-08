import { Frontmatter } from "@/app/api/post-handler";
import Image from "next/image";

import { Badge } from "./ui/badge";

interface PostDescriptionProps {
  frontmatter: Frontmatter;
}
export const PostDescription: React.FC<PostDescriptionProps> = ({
  frontmatter
}) => {
  return (
    <div className="border border-primary-foreground cursor-pointer hover:bg-primary/30 active:bg-primary/60 transition-colors duration-300 rounded-lg p-5 flex flex-col gap-5">
      <div className="text-2xl text-primary">{frontmatter.title} </div>
      <div className="text-gray-400 text-xl">
        {frontmatter.categories.map((category, index) => (
          <Badge key={index} variant={"outline"} className="text-sm">
            {category}
          </Badge>
        ))}
      </div>
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
      <div className="pt-5">
        <p>{frontmatter.short_description}</p>
      </div>
    </div>
  );
};

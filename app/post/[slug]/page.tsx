import { MdxContent } from "@/components/mdx-content";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GetPost } from "@/lib/api-utils/api-utils-post";
import { PostType } from "@/lib/post-interfaces";
import { serialize } from "next-mdx-remote/serialize";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await GetPost(slug);
  const { frontmatter, content } = post;
  const serialized = await serialize(content);

  return (
    <div className="container pt-32 text-xl">
      <h1 className="text-5xl pb-5">{frontmatter.title}</h1>
      <div className="flex flex-row gap-10 p-5">
        <div className="flex flex-col gap-3 text-right text-gray-300">
          <div>Date</div>
          <div>Categories</div>
        </div>
        <div className="flex flex-col gap-3 ">
          <div>{`${frontmatter.date.getDate()}.${frontmatter.date.getMonth()}.${frontmatter.date.getFullYear()}`}</div>
          <div>
            {frontmatter.categories.map((category, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" />
      <div className="pt-8">
        <MdxContent source={serialized} />
      </div>
    </div>
  );
}

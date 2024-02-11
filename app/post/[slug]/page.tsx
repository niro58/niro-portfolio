import { MdxContent } from "@/components/mdx-content";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PostType } from "@/lib/post-interfaces";
import { serialize } from "next-mdx-remote/serialize";

export default async function Page({ params }: { params: { slug: string } }) {
  if (process.env.NEXT_ROOT_PATH === undefined) return;
  const { slug } = params;

  const url = new URL(`/api/posts/${slug}`, process.env.NEXT_ROOT_PATH);

  const res = await fetch(url, {
    method: "GET"
  });
  console.log(res);
  if (!res.ok) {
    return null;
  }

  const post = await res.json();
  const { frontmatter, content } = post;
  if (frontmatter.date) {
    frontmatter.date = new Date(frontmatter.date);
  }
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
            {frontmatter.categories.map((category: PostType, index: number) => (
              <Badge key={index} variant={"outline"} className="text-sm">
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
